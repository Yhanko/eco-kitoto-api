import { Request, Response } from "express";
import { DrizzleUserRepository } from "../../infra/repositories/drizzleUserRepository";
import { BCryptHashProviderServices } from "../../infra/services/BCryptHashProviderServices";
import { JWTProviderServices } from "../../infra/services/JWTProviderServices";
import { Authenticate } from "../../app/usecase/user/auth";
import { DrizzleLogsRepository } from "../../infra/repositories/drizzleLogsRepository";
import { CreateLogs } from "../../app/usecase/logs/createLogs";

export class AuthController {

    constructor() {}

    async handle(request : Request, response : Response) : Promise<Response> {

        const { email, password } = request.body

        if(!email || !password) {
            return response.json({ message : "Dados inválidos!"})
        }

        const drizzleUserRepository = new DrizzleUserRepository()
        const hashProvider = new BCryptHashProviderServices()
        const jwtProvider = new JWTProviderServices()
        const drizzleLogsRepository = new DrizzleLogsRepository()

        const authenticate = new Authenticate(
            drizzleUserRepository,
            hashProvider,
            jwtProvider,
            drizzleLogsRepository
        )

        try {
                const result = await authenticate.execute({ email, password})

                const isProduction = process.env.NODE_ENV === 'production'

                //injetar o token no Cookie HttpOnly
                response.cookie(
                    'ecokitoto_token',
                    result.token,
                    {
                        httpOnly : true, //segurança contra XSS(impede leitura via js) e cwe-613
                        secure : isProduction, //no localhost será falso e na hospedagem web sera true
                        sameSite : isProduction ? 'none' : 'lax', 
                        maxAge : 2 * 60 * 60 * 1000 //2 horas em milisegundos
                    }
                )
 
                return response.status(201).json({ user : result.user })

        } catch (error : any) {

            //regista o log caso aconteça algum erro interno
            const logs = new CreateLogs(drizzleLogsRepository)

            await logs.execute({
                level : "ERROR",
                message : "Erro crítico na rota de login",
                metadata : {
                    track_trace : error.track,
                    ip : request.ip,
                    path : request.originalUrl 
                }
            })

            return response.status(400).json({ error : "Erro ao autenticar usuário!"})
        }
    }
}