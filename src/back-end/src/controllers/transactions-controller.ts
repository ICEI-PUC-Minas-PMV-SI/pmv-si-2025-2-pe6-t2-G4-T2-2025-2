import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { prisma, Prisma } from "@/database/prisma";
import { DateFilter } from "@/types/dateFilter";
import { z } from "zod";
import { Type } from "@prisma/client";

const typeEnum = z.enum(["expense", "income"])

class TransactionsController {
    async create(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado")
        }

        const bodySchema = z.object({
            description: z.string().trim().min(3, { message: "Descrição é obrigatório"}),
            type: z.enum(["expense", "income"]),
            amount: z.number().gt(0).positive({ message: "O valor deve ser positivo e maior que zero"}),
            date: z.string().datetime({ message: "Formato de data inválido"}),
            categoryId: z.string().uuid({ message: "ID da categoria inválido"})
        })

        const { description, type, amount, date, categoryId } = bodySchema.parse(request.body)

        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
                userId: userId
            }
        })

        if(!category) {
            throw new AppError("Categoria não encontrada ou não pertence a você", 404)
        }

        const transaction = await prisma.transactions.create({
            data: {
                description,
                type,
                amount,
                date: new Date(date),
                userId,
                categoryId,
            }
        })

        return response.status(201).json()
    }

    async list(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const querySchema = z.object({
            description: z.string().optional().default(""),
            month: z.coerce.number().min(1).max(12).optional(),
            year: z.coerce.number().min(2000).max(2100).optional(),
            page: z.coerce.number().optional().default(1),
            perPage: z.coerce.number().optional().default(10)
        })

        const { description, month, year, page, perPage } = querySchema.parse(request.query)

        const skip = (page - 1) * perPage

        let dateFilter: DateFilter = {}

        if(year) {
            const startMonth = month ? month : 1
            const endMonth = month ? month : 12

            dateFilter = {
                gte: new Date(year, startMonth - 1, 1),
                lte: new Date(year, endMonth, 1)
            }
        }

        const searchFilter: Prisma.TransactionsWhereInput = {
            userId,
            description: {
                contains: description.trim(),
                mode: Prisma.QueryMode.insensitive
            },
            date: dateFilter
        }

        const [transactions, totalRecords] = await prisma.$transaction([
            prisma.transactions.findMany({
                skip,
                take: perPage,
                where: searchFilter,
                orderBy: {
                    date: "desc"
                }
            }),
            prisma.transactions.count({
                where: searchFilter
            })
        ])

        const totalPages = Math.ceil(totalRecords / perPage)

        response.json({
            transactions,
            pagination: {
                page,
                perPage,
                totalRecords,
                totalPages: totalPages > 0 ? totalPages : 1
            }
        })
    }

    async show(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const paramsSchema = z.object({
            id: z.string().uuid({ message: "ID da transação inválido"})
        })

        const { id } = paramsSchema.parse(request.params)

        const transaction = await prisma.transactions.findUnique({
            where: {
                id,
                userId
            },
            include: {
                category: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })

        if(!transaction) {
            throw new AppError("Transação não encontrada", 404)
        }

        return response.json({transaction})
    }

    async update(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const paramsSchema = z.object({
            id: z.string().uuid({ message: "ID da transação inválido"})
        })

        const bodySchema = z.object({
            description: z.string().trim().min(3, { message: 'A descrição deve ter no mínimo 3 caracteres' }).optional(),
            type: typeEnum.optional(),
            amount: z.number().positive({ message: 'O valor deve ser positivo' }).optional(),
            date: z.string().datetime({ message: 'Formato de data inválido' }).optional(),
            categoryId: z.string().uuid({ message: 'ID de categoria inválido' }).optional(),
        }).refine(data => {
            return data.description !== undefined || data.type !== undefined || data.amount !== undefined || data.date !== undefined || data.categoryId !== undefined
        }, {
            message: 'Ao menos um campo deve ser fornecido para a atualização.',
            path: ['body'],
        })

        const { id } = paramsSchema.parse(request.params)
        const { description, type, amount, date, categoryId } = bodySchema.parse(request.body)

        const transactionExists = await prisma.transactions.findUnique({
            where: {
                id,
                userId
            }
        })

        if(!transactionExists) {
            throw new AppError("Transação não encontrada", 404)
        }

        if(categoryId) {
            const categoryExists = await prisma.category.findUnique({
                where: {
                    id: categoryId,
                    userId
                }
            })

            if(!categoryExists) {
                throw new AppError("Categoria não encontrada", 404)
            }
        }

        const updateData: {
            description?: string
            type?: Type,
            amount?: number,
            date?: Date,
            categoryId?: string
        } = {}

        if(description !== undefined) {
            updateData.description = description
        }

        if(type !== undefined) {
            updateData.type = type
        }
        
        if(amount !== undefined) {
            updateData.amount = amount
        }

        if(date !== undefined) {
            updateData.date = new Date(date)
        }

        if(categoryId !== undefined) {
            updateData.categoryId = categoryId
        }

        const updatedTransaction = await prisma.transactions.update({
            where: {
                id,
                userId
            },
            data: updateData
        })

        return response.json(updatedTransaction)
    }

    async delete(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const paramsSchema = z.object({
            id: z.string().uuid({ message: "ID da transação inválido"})
        })

        const { id } = paramsSchema.parse(request.params)

        const transactionExists = await prisma.transactions.findUnique({
            where: {
                id,
                userId
            }
        })

        if(!transactionExists) {
            throw new AppError("Transação não encontrada", 404)
        }

        await prisma.transactions.delete({
            where: {
                id,
            }
        })

        return response.status(204).send()
    }
}

export { TransactionsController}