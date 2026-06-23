import express from "express"
import { systemRouter } from "../http/routes"
import { setupSwagger } from "../infra/config/swagger"
import cors from "cors"
import cookieParser from "cookie-parser"

export const app = express()

const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

//middleware
    app.use(cors({
        origin : isDevelopment 
        ? true //em dev, aceita qualquer origem(inclusive localhost)
        :
        [
            //URLs reais dos frontends
        ],
        credentials : true, //permite que os cookies entrem e saiam da API

    })) //permite que qualquer origem acessa a API de forma local

    app.use(express.json())
    app.use(cookieParser()) //transforma os cookies de texto em objectos no request.cookies

// systema de rotas
    app.use(systemRouter)

//ativa o swagger
    setupSwagger(app)