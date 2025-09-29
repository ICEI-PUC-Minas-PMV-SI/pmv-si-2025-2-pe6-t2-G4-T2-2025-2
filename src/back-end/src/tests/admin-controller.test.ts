import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

let adminToken: string
let memberToken: string
let adminId: string
let memberId: string

beforeAll(async () => {
    await prisma.transactions.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Criar um usuário admin
    const adminCreate = await request(app)
        .post("/users")
        .send({
            email: "admin@test.com",
            name: "Admin User",
            password: "admin123",
            role: "admin"
        })

    const adminSession = await request(app)
        .post("/sessions")
        .send({
            email: "admin@test.com",
            password: "admin123"
        })

    adminToken = adminSession.body.token
    adminId = adminSession.body.user.id

    // Criar um usuário membro
    const memberCreate = await request(app)
        .post("/users")
        .send({
            email: "member@test.com",
            name: "Member User",
            password: "member123",
            role: "member"
        })

    const memberSession = await request(app)
        .post("/sessions")
        .send({
            email: "member@test.com",
            password: "member123"
        })

    memberToken = memberSession.body.token
    memberId = memberSession.body.user.id
})

afterAll(async () => {
    await prisma.transactions.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
})

describe("AdminController", () => {
    // Teste 1
    test("ADMIN deve listar todos os usuários e dados globais", async () => {
        const response = await request(app)
            .get("/admin/users")
            .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2); // Deve retornar o Admin e o Member
        expect(response.body.map((u: any) => u.role)).toContain('admin');
        expect(response.body.map((u: any) => u.role)).toContain('member');
    })

    // Teste 2
    test("usuário MEMBER não deve conseguir acessar a rota de listagem de usuários", async () => {
        const response = await request(app)
            .get("/admin/users")
            .set("Authorization", `Bearer ${memberToken}`)

        expect(response.status).toBe(401);
    })

    // Teste 3
    test("ADMIN deve visualizar as métricas globais", async () => {
        // Transações neste teste são zero
        const response = await request(app)
            .get("/admin/metrics")
            .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).toBe(200);
        expect(response.body.totalUsers).toBe(2); // Admin e Member
        expect(response.body.totalTransactions).toBe(0);
        expect(response.body.totalExpenses).toBe(0);
        expect(response.body.totalIncomes).toBe(0);
    })

    // Teste 4
    test("MEMBER não deve conseguir obter métricas do sistema", async () => {
        const response = await request(app)
            .get(`/admin/metrics`)
            .set("Authorization", `Bearer ${memberToken}`);

        expect(response.status).toBe(401);
    });
})