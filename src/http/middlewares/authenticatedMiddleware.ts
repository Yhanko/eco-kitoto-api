import { NextFunction, Request, Response } from "express";
import { JWTProviderServices } from "../../infra/services/JWTProviderServices";

export async function authenticatedMiddleware(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization
    
    //verify if token was sended
    if(!authHeader) {
        return response.json({ message : "Token não fornecido. Por favor, faça login!"})
    }

    const [, token] = authHeader.split(" ")

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

    } catch (error) {
        response.json({ error : "Token inválido ou expirado!"})
    }
}