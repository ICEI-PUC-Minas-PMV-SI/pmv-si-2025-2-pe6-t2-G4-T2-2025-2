import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { UsersController } from "@/controllers/users-controler";

const usersRoutes = Router()
const usersController = new UsersController()
// Rota pública
usersRoutes.post("/", usersController.create)

//Rota privada
usersRoutes.get("/me", ensureAuthenticated, verifyUserAuthorization(["admin", "member"]), usersController.show)
usersRoutes.patch("/me", ensureAuthenticated, verifyUserAuthorization(["admin", "member"]), usersController.update)

export { usersRoutes }