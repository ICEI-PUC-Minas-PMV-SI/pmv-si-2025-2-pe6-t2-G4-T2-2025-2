import { Router } from "express";
import { TransactionsController } from "@/controllers/transactions-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const transactionsRoutes = Router()
const transactionsController = new TransactionsController()

transactionsRoutes.use(verifyUserAuthorization(["admin", "member"]))
transactionsRoutes.post("/", transactionsController.create)

export { transactionsRoutes }