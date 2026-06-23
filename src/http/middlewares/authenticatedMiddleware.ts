import { NextFunction, Request, Response } from "express";
import { JWTProviderServices } from "../../infra/services/JWTProviderServices";

export async function authenticatedMiddleware(request: Request, response: Response, next: NextFunction) {
    
    const token = request.cookies['ecokitoto_token']
    
    //verify if token was sended
    if(!token) {
        return response.status(401).json({ message : "Token não fornecido. Por favor, faça login!"})
    }

    try {
            const jwtProviderServices = new JWTProviderServices()

            //validating the token
            const decoded = await jwtProviderServices.verifyToken(String(token))

            //send the user id to know, for egg, how is the responsible of any event
            request.user = {
                id : decoded.id,
                typeUser : decoded.typeUser
            }

            return next()

    } catch (error : any) {
        //se o erro foi gerado porque o tempo das 2horas acabou
        if(error.name === 'TokenExpiredError') {
            return response.status(401).json({ 
                error : "Unauthorized", 
                message : "A sua sessão expirou. Por favor, faça login novamente!"
            })
        }

        //se for outro erro
        return response.status(401).json({ 
            error : "Unauthorized",
            message : "Token Inválido ou Expirado!"
        })
    }
}