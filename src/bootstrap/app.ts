import express from "express"
import { systemRouter } from "../http/routes"

export const app = express()

//middleware
    app.use(express.json())

// systema de rotas
    app.use(systemRouter)