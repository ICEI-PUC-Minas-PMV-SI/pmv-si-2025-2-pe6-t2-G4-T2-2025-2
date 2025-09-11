import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { z } from "zod";

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

        response.status(201).json({ description, type, amount, date, categoryId })
    }
}

export { TransactionsController}