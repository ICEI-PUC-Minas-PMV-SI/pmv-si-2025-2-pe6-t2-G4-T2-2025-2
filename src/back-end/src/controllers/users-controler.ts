import { Request, Response } from "express"
import { Role } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { hash } from "bcrypt"

class UsersController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.string().email(),
            name: z.string(),
            password: z.string().min(6),
            role: z.enum([Role.admin, Role.member]).default(Role.member),
        })

        const { email, name, password, role } = bodySchema.parse(request.body)

        const userWhithSameEmail = await prisma.user.findFirst({ where: { email } })

        if(userWhithSameEmail) {
            throw new AppError("Já existe um usuário com esse e-mail.")
        }

        const hashedPassword = await hash(password, 8)

        await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role
            }
        })

        response.status(201).json()
    }

    async list(request: Request, response: Response) {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        response.json(users)
    }

}

export { UsersController }