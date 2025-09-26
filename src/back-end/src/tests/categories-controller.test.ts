import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/database/prisma';

let userToken: string;
let userId: string;
let categoryId: string

// Limpa o banco de dados antes de todos os testes
beforeAll(async () => {
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
});


describe("CategoriesController", () => {
    // Cria um usuário de teste e obtém um token antes dos testes
    beforeAll(async () => {
        const response = await request(app)
            .post('/users')
            .send({
                email: "test@example.com",
                name: "Test User",
                password: "password123",
                role: "member"
            });

        userId = response.body.id;

        const sessionResponse = await request(app)
            .post("/sessions")
            .send({
                email: "test@example.com",
                password: "password123"
            });
        
        if(sessionResponse.body.user) {
            userId = sessionResponse.body.user.id
        } else {
            throw new Error("Não foi possivel obter o ID do usuário")
        }

        userToken = sessionResponse.body.token;
    });

    afterAll(async () => {
        await prisma.user.delete({ where: { id: userId } })
    })

    // Teste 1
    test("Criar uma nova categoria", async () => {
        const categoryName = "Alimentacao"
        const categoryType = "expense"

        const response = await request(app)
            .post("/categories")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                name: categoryName,
                type: categoryType
            });

        expect(response.status).toBe(201);

        const createdCategory = await prisma.category.findFirst({
            where: {
                name: categoryName,
                type: categoryType
            }
        })

        if(!createdCategory) {
            throw new Error("ID da categoria não encontrado")
        }

        categoryId = createdCategory.id
    });

    // Teste 2
    test("Tentar criar uma categoria que já existe", async () => {
        const response = await request(app)
            .post("/categories")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                name: "Alimentacao",
                type: "expense"
            });

        expect(response.status).toBe(409);
    });

    // Teste 3
    test("Listar categorias somente do usuário logado", async () => {
        const response = await request(app)
            .get("/categories")
            .set("Authorization", `Bearer ${userToken}`);
        
        expect(response.status).toBe(200);
        expect(response.body.categories).toHaveLength(1);
        expect(response.body.categories[0].name).toBe("Alimentacao");
    });

    // Teste 4
    test("Atualizar uma categoria do usuário logado", async () => {
        const response = await request(app)
            .patch(`/categories/${categoryId}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                name: "Alimentacao Editada"
            });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Alimentacao Editada");
    });

    // Teste 5
    test('Deletar uma categoria do usuário logado', async () => {
        const response = await request(app)
            .delete(`/categories/${categoryId}`)
            .set("Authorization", `Bearer ${userToken}`);
        
        expect(response.status).toBe(204);
    });

    // Teste 6
    test('Retornar status 404 quando tentar deletar uma categoria que não existe mais', async () => {
        const response = await request(app)
            .delete(`/categories/${categoryId}`)
            .set("Authorization", `Bearer ${userToken}`);
        
        expect(response.status).toBe(404);
    });
});