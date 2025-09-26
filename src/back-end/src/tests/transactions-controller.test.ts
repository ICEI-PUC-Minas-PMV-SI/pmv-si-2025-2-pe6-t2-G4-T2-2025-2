import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"

let userOneToken: string
let userOneId: string
let userOneCategoryId: string
let transactionOneId: string
let userTwoToken: string // Usuário para testar a falha de segurança

beforeAll(async () => {
    await prisma.transactions.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()
})

describe("TransactionsController", () => {
    beforeAll(async () => {
        const userOneCreate = await request(app)
            .post("/users")
            .send({
                email: "membertest@test.com",
                name: "Usuário Membro",
                password: "password123",
                role: "member"
            })
        
        userOneId = userOneCreate.body.id

        const sessionsResponse = await request(app)
            .post("/sessions")
            .send({
                email: "membertest@test.com",
                password: "password123"
            })

        userOneToken = sessionsResponse.body.token

        const categoryName = "Renda Fixa"
        const categoryType = "income"

        const categoryResponse = await request(app)
            .post("/categories")
            .set("Authorization", `Bearer ${userOneToken}`)
            .send({
                name: categoryName,
                type: categoryType
            })

        const createdCategory = await prisma.category.findFirst({
            where: {
                userId: userOneId,
                name: categoryName,
                type: categoryType
            }
        })

        if(!createdCategory) {
            throw new Error("Categoria de teste não encontrada no DB")
        }
        userOneCategoryId = createdCategory.id

        

        // Usuário Invasor
        const userTwoCreate = await request(app)
            .post("/users")
            .send({
                email: 'invasor@test.com',
                name: 'Usuário Invasor',
                password: 'password123',
                role: 'member'
            })

        const sessionTwoResponse = await request(app)
            .post("/sessions")
            .send({
                email: 'invasor@test.com',
                password: 'password123'
            })

        userTwoToken = sessionTwoResponse.body.token
    })

    afterAll(async () => {
        await prisma.transactions.deleteMany()
        await prisma.category.deleteMany()
        await prisma.user.deleteMany()
    })

    // Teste 1
    test("Criar uma nova Transação de Receita", async () => {
        const transactionDescription = "Salário do Mês"
        const transactionType = "income"
        const transactionAmount = 5000.55
        const transactionDate = "2025-08-15T10:00:00Z"

        const response = await request(app)
            .post("/transactions")
            .set("Authorization", `Bearer ${userOneToken}`)
            .send({
                description: transactionDescription,
                type: transactionType,
                amount: transactionAmount,
                date: transactionDate,
                categoryId: userOneCategoryId,
            })

        expect(response.status).toBe(201)

        const createdTransaction = await prisma.transactions.findFirst({
            where: {
                description: transactionDescription,
                type: transactionType,
                amount: transactionAmount,
                date: transactionDate,
                categoryId: userOneCategoryId, 
            }
        })

        if(!createdTransaction) {
            throw new Error("ID da transação não localizada")
        }
        transactionOneId = createdTransaction.id
    })

    // Teste 2
    
})

