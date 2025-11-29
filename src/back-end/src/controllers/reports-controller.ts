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

        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 1));

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

    async categoryReport(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const querySchema = z.object({
            month: z.coerce.number().min(1, { message: "Mês inválido" }).max(12, { message: "Mês inválido" }),
            year: z.coerce.number().min(2000, { message: "Ano inválido" }).max(2100, { message: "Ano inválido" })
        })

        const { month, year } = querySchema.parse(request.query)

        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 1));

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

    async weeklyReport(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const querySchema = z.object({
            month: z.coerce.number().min(1).max(12),
            year: z.coerce.number().min(2000).max(2100),
        });

        const { month, year } = querySchema.parse(request.query);

        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 1));

        // Busca TODAS as transações do mês
        const transactions = await prisma.transactions.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            select: {
                date: true,
                amount: true,
                type: true
            }
        });

        // Função para determinar a semana do mês
        const weeklyData = [
            { week: 'Sem 1', income: 0, expense: 0 },
            { week: 'Sem 2', income: 0, expense: 0 },
            { week: 'Sem 3', income: 0, expense: 0 },
            { week: 'Sem 4', income: 0, expense: 0 },
        ];

        // Agrupa as transações por semana
        transactions.forEach(t => {
            const day = t.date.getDate();
            
            // Lógica: Dias 1-7 (Sem 1), 8-14 (Sem 2), 15-21 (Sem 3), 22+ (Sem 4)
            let weekIndex = Math.floor((day - 1) / 7);
            if (weekIndex > 3) weekIndex = 3;

            const amount = Number(t.amount);

            if (t.type === 'income') {
                weeklyData[weekIndex].income += amount;
            } else {
                weeklyData[weekIndex].expense += amount;
            }
        });

        return response.json(weeklyData);
    }
}

export { ReportsController}