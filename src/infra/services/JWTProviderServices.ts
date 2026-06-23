import 'dotenv/config'
import jwt from "jsonwebtoken";
import { JWTProviderRepository } from '../../app/domain/repositories/JWTProviderRepository';

export class JWTProviderServices implements JWTProviderRepository {

    constructor() {}

//generate token
    async generateToken(payload: object): Promise<string> {
        
        const secret = process.env.JWT_SECRET || 'fallback_secret_para_dev'
        
        const token = jwt.sign(payload, secret, { expiresIn : '2h'})

        return token
    }

//verify token
    async verifyToken(token: string) : Promise<any> {
        
        const secret = process.env.JWT_SECRET || 'fallback_secret_para_dev'

        return jwt.verify(token, secret)
    }
}