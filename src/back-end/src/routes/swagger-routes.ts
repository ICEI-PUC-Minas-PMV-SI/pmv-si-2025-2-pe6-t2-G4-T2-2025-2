import { Router } from "express";
import swaggerUi from "swagger-ui-express";


const swaggerRoutes = Router()
const swaggerDocument = require("../documentation/openapi.json")

swaggerRoutes.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { background-color: #000 }",
    swaggerOptions: {
        security: [{
            BearerAuth: []
        }],
        authAction: {
            bearerAuth: {
                name: "Authorization",
                schema: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "Digite o token JWT no formato: Bearer [token]"
                },
                value: "Bearer [COLE SEU TOKEN AQUI]"
            }
        }
    }
}))

export { swaggerRoutes }