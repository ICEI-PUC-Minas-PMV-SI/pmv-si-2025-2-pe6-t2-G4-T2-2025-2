import { Router } from "express";

import { UsersController } from "@/controllers/users-controler";

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.get("/", usersController.list)

export { usersRoutes }