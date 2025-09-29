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
        await prisma.$disconnect();
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
    test("Retorna 404 se a categoria não existir para o usuário", async () => {
        const response = await request(app)
            .post("/transactions")
            .set("Authorization", `Bearer ${userTwoToken}`)
            .send({
                description: "Salário do Mês",
                type: "income",
                amount: 1000,
                date: "2025-08-15T10:00:00Z",
                categoryId: userOneCategoryId, // Categoria pertence ao userOne
            })

        expect(response.status).toBe(404)
        expect(response.body.message).toContain("Categoria não encontrada ou não pertence a você");
    })

    // Teste 3
    test("Deve listar transações e incluir detalhes de categoria", async () => {
        const response = await request(app)
            .get("/transactions")
            .set("Authorization", `Bearer ${userOneToken}`)

        expect(response.status).toBe(200)
        expect(response.body.transactions).toHaveLength(1);
        expect(response.body.transactions[0].category.name).toBe("Renda Fixa");
    })

    // Teste 4
    test("Deve filtrar por mês e ano corretamente", async () => {
        // Adiciona uma transação em um mês diferente (Setembro)
        await request(app)
            .post("/transactions")
            .set("Authorization", `Bearer ${userOneToken}`)
            .send({
                description: "Aluguel",
                type: "expense",
                amount: 1500,
                date: "2025-09-01T10:00:00Z",
                categoryId: userOneCategoryId,
                month: 8,
                year: 2025
            })

        // Tenta buscar apenas pelo mês de Agosto (Mês=8)
        const response = await request(app)
            .get("/transactions")
            .query({ month: 8, year: 2025 })
            .set("Authorization", `Bearer ${userOneToken}`)
            
        expect(response.status).toBe(200)
        expect(response.body.transactions).toHaveLength(1);
        expect(response.body.transactions[0].description).toBe("Salário do Mês");
    })

    // Teste 5
    test("Deve falhar ao tentar atualizar transação de outro usuário", async () => {
        const response = await request(app)
            .patch(`/transactions/${transactionOneId}`)
            .set("Authorization", `Bearer ${userTwoToken}`) // Token do INVASOR
            .send({
                description: "Tentativa de Fraude",
                amount: 6000
            })

        expect(response.status).toBe(404)
        expect(response.body.message).toContain("Transação não encontrada")
    })

    // Teste 6
    test("Deve deletar a transação criada", async () => {
        const response = await request(app)
            .delete(`/transactions/${transactionOneId}`)
            .set("Authorization", `Bearer ${userOneToken}`)

        expect(response.status).toBe(204)

        const deletedTransaction = await prisma.transactions.findUnique({
            where: { id: transactionOneId }
        })
        expect(deletedTransaction).toBeNull()
    })
})

