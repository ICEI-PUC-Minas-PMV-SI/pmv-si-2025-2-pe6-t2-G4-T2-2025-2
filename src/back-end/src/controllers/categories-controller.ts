import { Request, Response } from "express";
import { prisma, Prisma } from "@/database/prisma";
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

        const searchFilter = {
            userId,
            name: {
                contains: name.trim(),
                mode: Prisma.QueryMode.insensitive
            }
        }

        const [ categories, totalRecords ] = await prisma.$transaction([
            prisma.category.findMany({
                skip,
                take: perPage,
                where: searchFilter,
                orderBy: {
                    name: "asc"
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            }),
            prisma.category.count({
                where: searchFilter
            })
        ])

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

    async update(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const bodySchema = z.object({
            name: z.string().trim().min(3, { message: "Nome é obrigatório"}).optional(),
            type: typeEnum.optional(),
        }).refine( data => data.name !== undefined || data.type !== undefined, {
            message: "Ao menos um dos campos (nome ou tipo) deve ser fornecido.",
            path: ["name", "type"]
        })

        const { id } = paramsSchema.parse(request.params)
        const { name, type } = bodySchema.parse(request.body)

        const category = await prisma.category.findUnique({
            where: {
                id,
                userId
            }
        })

        if(!category) {
            throw new AppError("Categoria não encontrada ou não pertence a você", 404)
        }

        const updatedCategory = await prisma.category.update({
            data: {
                name,
                type
            },
            where: {
                id
            }
        })

        response.json(updatedCategory)
    }

    async delete(request: Request, response: Response) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const category = await prisma.category.findUnique({
            where: {
                id,
                userId
            }
        })

        if(!category) {
            throw new AppError("Categoria não encontrada ou não pertence a você", 404)
        }

        await prisma.category.delete({
            where: {
                id
            }
        })

        response.status(204).send()
    }
}

export { CategoriesController }