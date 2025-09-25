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
        const response = await request(app)
            .post("/user")
    })
})