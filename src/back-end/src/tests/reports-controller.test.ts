import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/database/prisma';

let userToken: string
let userOneId: string
let userOneCategoryOneId: string
let userOneCategoryTwoId: string

const TEST_YEAR = 2025
const TARGET_MONTH = 9 // Setembro

beforeAll(async () => {
    await prisma.transactions.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Criar usuário de teste
    const userCreate = await request(app)
        .post("/users")
        .send({
            email: "reports.user@test.com",
            name: "Usuário Membro",
            password: "password123",
            role: "member"
        })
    
    const sessionsResponse = await request(app).post("/sessions").send({
        email: "reports.user@test.com",
        password: "password123"
    })

    if(sessionsResponse.body.user) {
        userOneId = sessionsResponse.body.user.id
    } else {
        throw new Error("Não foi possivel obter o ID do usuário")
    }

    userToken = sessionsResponse.body.token

    // Criar categoria de teste
    const categoryOneName = "Salário"
    const categoryOneType = "income"

    await request(app)
        .post("/categories")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
            name: categoryOneName,
            type: categoryOneType
        })

    const createdOneCategory = await prisma.category.findFirst({
        where: {
            userId: userOneId,
            name: categoryOneName,
            type: categoryOneType
        }
    })

    if(!createdOneCategory) {
        throw new Error("Categoria de teste não encontrada no DB")
    }

    userOneCategoryOneId = createdOneCategory.id

    const categoryTwoName = "Aluguel"
    const categoryTwoType = "expense"

    const categoryTwoResponse = await request(app)
        .post("/categories")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
            name: categoryTwoName,
            type: categoryTwoType
        })

    const createdTwoCategory = await prisma.category.findFirst({
        where: {
            userId: userOneId,
            name: categoryTwoName,
            type: categoryTwoType
        }
    })

    if(!createdTwoCategory) {
        throw new Error("Categoria de teste não encontrada no DB")
    }

    userOneCategoryTwoId = createdTwoCategory.id

    // Criar transações de teste
    // RENDA
    await prisma.transactions.create({
        data: {
            description: "Salário Setembro",
            type: "income",
            amount: 5000,
            date: new Date(`${TEST_YEAR}-09-10T12:00:00Z`), // 10 de Setembro de 2025
            userId: userOneId,
            categoryId: userOneCategoryOneId
        }
    })

    // DESPESAs
    await prisma.transactions.create({
        data: {
            description: "Mercado Setembro",
            type: "expense",
            amount: 1500,
            date: new Date(`${TEST_YEAR}-09-15T12:00:00Z`), // 15 de Setembro de 2025
            userId: userOneId,
            categoryId: userOneCategoryTwoId
        }
    })

    await prisma.transactions.create({
        data: {
            description: "Mercado Agosto",
            type: 'expense',
            amount: 1000,
            date: new Date(`${TEST_YEAR}-08-15T12:00:00Z`),// 15 de Agosto de 2025
            userId: userOneId,
            categoryId: userOneCategoryTwoId,
        }
    });
})

afterAll(async () => {
    await prisma.transactions.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()
    await prisma.$disconnect();
})

describe("ReportsController", () => {
    // Teste 1
    test("Deve calcular o resumo (receita/despesa) corretamente para o mês de referencia", async () => {
        const response = await request(app)
            .get(`/reports/summary?month=${TARGET_MONTH}&year=${TEST_YEAR}`)
            .set("Authorization", `Bearer ${userToken}`)
        
        expect(response.status).toBe(200)
        expect(response.body.totalExpense).toBe(1500) // Despesa total em Setembro: 1500
        expect(response.body.totalIncomes).toBe(5000) // Receita total em Setembro: 5000
    })

    // Teste 2
    test("Deve retornar 0 para despesas e receitas de uma mês sem transações", async () => {
        const EMPTY_MONTH = 10 // Outubro
        const response = await request(app)
            .get(`/reports/summary?month=${EMPTY_MONTH}&year=${TEST_YEAR}`)
            .set("Authorization", `Bearer ${userToken}`)
        
        expect(response.status).toBe(200)
        expect(response.body.totalExpense).toBe(0) // Despesa total em Outubro: 0
        expect(response.body.totalIncomes).toBe(0) // Receita total em Outubro: 0
    })

    // Teste 3
    test("Deve agrupar por categoria e tipo corretamente", async () => {
        const response = await request(app)
            .get(`/reports/by-category?month=${TARGET_MONTH}&year=${TEST_YEAR}`)
            .set("Authorization", `Bearer ${userToken}`)

        expect(response.status).toBe(200)
        expect(response.body.length).toBe(2) // Deve haver 2 categorias (1 de receita e 1 de despesa)

        // Verifica a agregação da Despesa
        const expenseReport = response.body.find((item: any) => item.type === "expense")
        expect(expenseReport.categoryName).toBe("Aluguel")
        expect(expenseReport.totalAmount).toBe(1500)
    })

    // Teste 4
    test("Deve retornar 401 porque usuário não está autenticado", async () => {
        const response = await request(app)
            .get(`/reports/summary?month=${TARGET_MONTH}&year=${TEST_YEAR}`)
        
        expect(response.status).toBe(401)
        expect(response.body.message).toBe("JWT Token não encontrado")
    })

    // Teste 5
    test("Deve retornar 400 se o mês for inválido", async () => {
        const response = await request(app)
            .get(`/reports/summary?month=13&year=${TEST_YEAR}`)
            .set("Authorization", `Bearer ${userToken}`)
        
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("validation error") // Mensagem genérica de erro de validação
    })
})