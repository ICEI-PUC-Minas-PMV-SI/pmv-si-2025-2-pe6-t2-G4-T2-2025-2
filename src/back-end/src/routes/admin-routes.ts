import { Router } from "express";
import { AdminController } from "@/controllers/admin-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const adminRoutes = Router()
const adminController = new AdminController()

adminRoutes.use(verifyUserAuthorization(["admin"]))
adminRoutes.get("/users", adminController.listAllUsers)
adminRoutes.get("/metrics", adminController.metrics)
adminRoutes.delete("/users/:id", adminController.deleteUser)
adminRoutes.get("/recent-activity", adminController.recentActivity)

export { adminRoutes }