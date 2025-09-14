import { Request, Response } from 'express';
import { prisma } from '@/database/prisma';

class AdminController {
    async listUsers(request: Request, response: Response) {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
        return response.json(users);
    }

    async metrics(request: Request, response: Response) {
        const [
            totalUsers,
            totalTransactions,
            totalExpenses,
            totalIncomes
        ] = await prisma.$transaction([
            prisma.user.count(),
            prisma.transactions.count(),
            prisma.transactions.aggregate({
                _sum: {
                    amount: true
                },
                where: {
                    type: "expense"
                }
            }),
            prisma.transactions.aggregate({
                _sum: {
                    amount: true
                },
                where: {
                    type: "income"
                }
            })
        ])

        const metrics = {
            totalUsers,
            totalTransactions,
            totalExpenses: totalExpenses._sum.amount || 0,
            totalIncomes: totalIncomes._sum.amount || 0
        }

        return response.json(metrics)
    }
}

export { AdminController }