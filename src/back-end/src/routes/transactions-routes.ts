import { Router } from "express";
import { TransactionsController } from "@/controllers/transactions-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const transactionsRoutes = Router()
const transactionsController = new TransactionsController()

transactionsRoutes.use(verifyUserAuthorization(["admin", "member"]))
transactionsRoutes.post("/", transactionsController.create)
transactionsRoutes.get("/", transactionsController.list)
transactionsRoutes.get("/:id", transactionsController.show)
transactionsRoutes.patch("/:id", transactionsController.update)
transactionsRoutes.delete("/:id", transactionsController.delete)

export { transactionsRoutes }