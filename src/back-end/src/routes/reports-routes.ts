import { Router } from "express";
import { ReportsController } from "@/controllers/reports-controller";

const reportsRoutes = Router()
const reportsController = new ReportsController()

reportsRoutes.get("/summary", reportsController.summary)
reportsRoutes.get("/by-category", reportsController.byCategory)

export { reportsRoutes}