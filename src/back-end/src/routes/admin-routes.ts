import { Router } from "express";
import { AdminController } from "@/controllers/admin-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const adminRoutes = Router()
const adminController = new AdminController()

adminRoutes.use(verifyUserAuthorization(["admin"]))
adminRoutes.get("/users", adminController.listUsers)
adminRoutes.get("/metrics", adminController.metrics)

export { adminRoutes }