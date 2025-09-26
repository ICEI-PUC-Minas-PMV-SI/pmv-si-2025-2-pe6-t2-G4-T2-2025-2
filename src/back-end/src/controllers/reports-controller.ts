import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"

class ReportsController {
    async summary(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const querySchema = z.object({
            month: z.coerce.number().min(1, { message: "Mês inválido" }).max(12, { message: "Mês inválido" }),
            year: z.coerce.number().min(2000, { message: "Ano inválido" }).max(2100, { message: "Ano inválido" })
        })

        const { month, year } = querySchema.parse(request.query)

        const startDate = new Date(year, month - 1, 1)
        const endDate = new Date(year, month, 1)

        const [ totalExpense, totalIncomes ] = await prisma.$transaction([
            prisma.transactions.aggregate({
                _sum: {
                    amount: true
                },
                where: {
                    userId,
                    type: "expense",
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            }),
            prisma.transactions.aggregate({
                _sum: {
                    amount: true
                },
                where: {
                    userId,
                    type: "income",
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            })
        ])

        const summary = {
            totalExpense: totalExpense._sum.amount || 0,
            totalIncomes: totalIncomes._sum.amount || 0,
            balance: (totalIncomes._sum.amount || 0) - (totalExpense._sum.amount || 0)
        }
        return response.json(summary)
    }

    async byCategory(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const querySchema = z.object({
            month: z.coerce.number().min(1, { message: "Mês inválido" }).max(12, { message: "Mês inválido" }),
            year: z.coerce.number().min(2000, { message: "Ano inválido" }).max(2100, { message: "Ano inválido" })
        })

        const { month, year } = querySchema.parse(request.query)

        const startDate = new Date(year, month - 1, 1)
        const endDate = new Date(year, month, 1)

        const allUserCategories = await prisma.category.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                type: true
            }
        })

        const transactionsByCategory = await prisma.transactions.groupBy({
            by: ["categoryId", "type"],
            _sum: {
                amount: true
            },
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate
                }
            }
        })

        const categoryData = transactionsByCategory.map((item) => {
            const category = allUserCategories.find(cat => cat.id === item.categoryId)

            return {
                categoryName: category?.name,
                type: item.type,
                totalAmount: item._sum.amount
            }
        })

        return response.json(categoryData)
    }
}

export { ReportsController}