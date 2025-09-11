import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

import { usersRoutes } from "./user-routes";
import { sessionsRoutes } from "./sessions-routes";
import { categoriesRoutes } from "./categories-routes";
import { transactionsRoutes } from "./transactions-routes";

const routes = Router()

// Rotas Públicas
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)

//Rotas Privadas
routes.use(ensureAuthenticated)
routes.use("/categories", categoriesRoutes)
routes.use("/transactions", transactionsRoutes)

export { routes }