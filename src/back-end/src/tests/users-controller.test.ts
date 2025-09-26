import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"

let userToken: string
let userId: string

beforeAll(async () => {
    await prisma.user.deleteMany()
})

describe("UsersController", () => {
    beforeAll(async () => {

        // Cria o usuário
        const response = await request(app)
            .post("/users")
            .send({
                email: "usuarioautenticado@test.com",
                name: "Usuário Autenticado",
                password: "password123",
                role: "member"
            })

        userId = response.body.id

        // Efetua o login (Cria a sessão autenticada)
        const sessionResponse = await request(app)
            .post("/sessions")
            .send({
                email: "usuarioautenticado@test.com",
                password: "password123"
            })
        
        if(sessionResponse.body.user) {
            userId = sessionResponse.body.user.id
        } else {
            throw new Error("Não foi possivel obter o ID do usuário")
        }

        userToken = sessionResponse.body.token
    })

    //Depois de executar o teste remove o usuário criado
    afterAll(async () => {
        await prisma.user.delete({ where: { id: userId } })
    })

    // Teste 1
    test("Tenta criar um usuário com um email já existente", async () => {
        const response = await request(app)
            .post("/users")
            .send({
                email: "usuarioautenticado@test.com",
                name: "Outro Usuário",
                password: "123456",
                role: "member" 
            })
        
        expect(response.status).toBe(409)
    })

    // Teste 2
    test("Obtem o perfil do usuário autenticado", async () => {
        const response = await request(app)
            .get("/users/me")
            .set("Authorization", `Bearer ${userToken}`)
        
        expect(response.status).toBe(200)
        expect(response.body.id).toBe(userId)
        expect(response.body.email).toBe("usuarioautenticado@test.com")
    })

    // Teste 3
    test("Tentar obter o perfil do usuário sem estar autenticado", async () => {
        const response = await request(app)
            .get("/users/me")

        expect(response.status).toBe(401)
    })

    // Teste 4
    test("Atualizar o perfil do usuário que esta logado", async () => {
        const response = await request(app)
            .patch("/users/me")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                name: "Usuário Atualizado"
            })
        
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Usuário Atualizado")
    })

    //Teste 5
    test("Tentar atualizar o perfil com dados inválidos", async () => {
        const response = await request(app)
            .patch("/users/me")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                email: "teste.com" // formato de email errado
            })

        expect(response.status).toBe(400)
    })

    // Teste 6
    test("Tentar atualizar o perfil sem logar com usuário autenticado", async () => {
        const response = await request(app)
            .patch("/users/me")
            .send({
                name: "Usuário sem logar"
            })

        expect(response.status).toBe(401)
    })
})