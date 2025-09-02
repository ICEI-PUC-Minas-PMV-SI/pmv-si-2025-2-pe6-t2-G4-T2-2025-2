import express from "express"
import cors from "cors"
import { errorHandling } from "./middlewares/error-handling"

const app = express()
app.use(cors())
app.use(express.json())

app.use(errorHandling)

export { app }