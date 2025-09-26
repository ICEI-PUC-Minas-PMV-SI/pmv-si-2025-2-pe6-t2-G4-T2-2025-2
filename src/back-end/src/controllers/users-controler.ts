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
            throw new AppError("Já existe um usuário com esse e-mail.", 409)
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

    async show(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        })

        return response.json(user)
    }

    async update(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const bodySchema = z.object({
            name: z.string().trim().min(3, { message: "Nome deve ter pelo menos 3 caracteres." }).optional(),
            password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres." }).optional(),
        }).refine(data => data.name !== undefined || data.password !== undefined, {
            message: "Pelo menos um dos campos (nome ou senha) deve ser fornecido para a atualização.",
            path: ["body"]
        })

        const { name, password } = bodySchema.parse(request.body)

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if(!user) {
            throw new AppError("Usuário não encontrado", 404)
        }

        let passwordHash: string = user.password

        if(password) {
            passwordHash = await hash(password, 8)
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name || user.name,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return response.json(updatedUser)
    }

}

export { UsersController }