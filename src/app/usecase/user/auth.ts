import { AuthUserDTO } from "../../../http/interfaces/userDTO";
import { HashProviderRepository } from "../../domain/repositories/hashProviderRepository";
import { JWTProviderRepository } from "../../domain/repositories/JWTProviderRepository";
import { UserRepository } from "../../domain/repositories/userRepository";

export class Authenticate {

    constructor(
        private userRepository : UserRepository,
        private hashProviderRepository : HashProviderRepository,
        private jwtProviderRepository : JWTProviderRepository
    ) {}

//execute
    async execute(data : AuthUserDTO) : Promise<any> {

        //verify if user already exist
        const user = await this.userRepository.findByEmail(data.email)

        if(!user) {
            throw new Error("E-mail ou senha incorretas!")
        }

        //verify if password hash is the same
        const verifyPassword = await this.hashProviderRepository.compareHash(data.password, user[0]?.password as any)

        if(!verifyPassword) {
            throw new Error("E-mail ou senha incorretas!")
        }

        //generate the token
        const token = await this.jwtProviderRepository.generateToken({
            id : user[0]?.iduser,
            typeUser : user[0]?.typeUser
        })

        return {
            user : {
                id: user[0]?.iduser,
                name: user[0]?.name,
                email: user[0]?.email,
                typeUser: user[0]?.typeUser
            },
            token
        }
    }
}