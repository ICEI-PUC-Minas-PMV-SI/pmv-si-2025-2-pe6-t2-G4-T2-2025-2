import { Request, Response } from 'express';
import { Prisma, prisma } from '@/database/prisma';
import { z } from 'zod';
import { AppError } from '@/utils/AppError';
import { ActivityItem } from "@/types/activityItem"

class AdminController {
    async listAllUsers(request: Request, response: Response) {
        
        const querySchema = z.object({
            limit: z.coerce.number().int().optional(),
            page: z.coerce.number().int().min(1).default(1),
            perPage: z.coerce.number().int().min(1).max(50).default(10),
            search: z.string().optional().default(''),
            sortBy: z.string().optional().default('createdAt'),
            order: z.enum(['asc', 'desc']).optional().default('desc'),
        });

        const { page, perPage, search, sortBy, order, limit } = querySchema.parse(request.query);

        const whereClause: Prisma.UserWhereInput = {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ],
        };

        const findManyArgs = {
            where: whereClause,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { [sortBy]: order },
            take: limit ? limit : perPage,
            skip: limit ? 0 : (page - 1) * perPage,
        };
        
        const [users, totalRecords] = await prisma.$transaction([
            prisma.user.findMany(findManyArgs),
            prisma.user.count({ where: whereClause })
        ]);

        const totalPages = limit ? 1 : Math.ceil(totalRecords / perPage);

        return response.json({
            users,
            pagination: {
                page: limit ? 1 : page,
                perPage: limit ? totalRecords : perPage,
                totalRecords,
                totalPages: totalPages > 0 ? totalPages : 1,
            }
        });
    }

    async metrics(request: Request, response: Response) {
        const [
            totalUsers,
            totalTransactionsCount,
            totalFinancialMovement,
        ] = await prisma.$transaction([
            prisma.user.count(),
            prisma.transactions.count(),
            prisma.transactions.aggregate({
                _sum: {
                    amount: true
                }
            }),
        ])

        const metrics = {
            totalUsers,
            totalTransactionsCount,
            totalFinancialMovement: totalFinancialMovement._sum.amount || 0
        }

        return response.json(metrics)
    }

    async deleteUser(request: Request, response: Response) {
        
        const paramsSchema = z.object({
            id: z.string().uuid("ID de usuário inválido."),
        });

        const { id } = paramsSchema.parse(request.params);

        
        const adminUserId = request.user?.id;

        if (id === adminUserId) {
            throw new AppError("Um administrador não pode excluir a própria conta.", 403);
        }

        const userExists = await prisma.user.findUnique({
            where: { id },
        });

        if (!userExists) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        await prisma.user.delete({
            where: { id },
        });

        return response.status(204).send();
    }

    async recentActivity(request: Request, response: Response) {
        
        const querySchema = z.object({
            limit: z.coerce.number().int().min(1).max(20).default(5),
        });

        const { limit } = querySchema.parse(request.query);

        const recentUsers = await prisma.user.findMany({
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
            }
        });

        const recentTransactions = await prisma.transactions.findMany({
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                user: {
                    select: { name: true }
                }
            }
        });

        const mappedUsers: ActivityItem[] = recentUsers.map(user => ({
            id: user.id,
            type: 'USER_REGISTERED',
            timestamp: user.createdAt.toISOString(),
            userName: user.name,
        }));

        const mappedTransactions: ActivityItem[] = recentTransactions.map(tx => ({
            id: tx.id,
            type: 'TRANSACTION_CREATED',
            timestamp: tx.createdAt.toISOString(),
            userName: tx.user.name,
            transactionDescription: tx.description,
            transactionAmount: tx.amount,
            transactionType: tx.type,
        }));
        
        const combinedFeed = [...mappedUsers, ...mappedTransactions];

        const sortedFeed = combinedFeed.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        const recentActivities = sortedFeed.slice(0, limit);

        return response.json(recentActivities);
    }
}

export { AdminController }