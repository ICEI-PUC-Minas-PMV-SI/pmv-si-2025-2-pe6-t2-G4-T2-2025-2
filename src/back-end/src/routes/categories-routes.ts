import { Router } from "express";
import { CategoriesController } from "@/controllers/categories-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const categoriesRoutes = Router()
const categoriesController = new CategoriesController()

categoriesRoutes.use(verifyUserAuthorization(["admin", "member"]))
categoriesRoutes.post("/", categoriesController.create)
categoriesRoutes.get("/", categoriesController.list)
categoriesRoutes.get("/:id", categoriesController.update)

export { categoriesRoutes }