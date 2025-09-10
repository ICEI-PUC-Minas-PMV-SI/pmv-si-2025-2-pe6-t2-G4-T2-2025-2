import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { z } from "zod";

const typeEnum = z.enum(["expense", "income"])

class CategoriesController {
    async create(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const bodySchema = z.object({
            name: z.string().trim().min(3, { message: "Nome é obrigatório"}),
            type: typeEnum,
        })

        const {name, type} = bodySchema.parse(request.body)

        const categoryExist = await prisma.category.findFirst({
            where: {
                name,
                userId: userId
            }
        })

        if(categoryExist) {
            throw new AppError("Categoria com este nome já existe para o seu usuário.", 409)
        }

        const category = await prisma.category.create({
            data: {
                name,
                type,
                userId: userId
            }
        })
        response.status(201).json(category)
    }

    async list(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const querySchema = z.object({
            name: z.string().optional().default(""),
            page: z.coerce.number().optional().default(1),
            perPage: z.coerce.number().optional().default(10),
        })

        const { name, page, perPage } = querySchema.parse(request.query)

        const skip = (page - 1) * perPage

        const categories = await prisma.category.findMany({
            skip,
            take: perPage,
            where: {
                userId,
                name: {
                    contains: name.trim(),
                    mode: "insensitive",
                }
            },
            orderBy: {
                name: "asc"
            }
        })

        const totalRecords = await prisma.category.count({
            where: {
                userId,
                name: {
                    contains: name.trim(),
                    mode: "insensitive",
                }
            },
            orderBy: {
                name: "asc"
            }
        })

        const totalPages = Math.ceil(totalRecords / perPage)

        response.status(200).json({
            categories,
            pagination: {
                page,
                perPage,
                totalRecords,
                totalPages: totalPages > 0 ? totalPages : 1
            }
        })
    }

    async update (request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const bodySchema = z.object({
            name: z.string().trim().min(3, { message: "Nome é obrigatório"}),
            type: typeEnum,
        })

        const { id } = paramsSchema.parse(request.params)

        const categories = await prisma.category.findFirst({
            where: {
                id
            },
            include: {
                user: true
            }
        })

        response.status(200).json(categories)
    }
}

export { CategoriesController }