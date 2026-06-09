import { AuthUserDTO } from "../../../http/interfaces/userDTO";
import { HashProviderRepository } from "../../domain/repositories/hashProviderRepository";
import { JWTProviderRepository } from "../../domain/repositories/JWTProviderRepository";
import { LogsRepository } from "../../domain/repositories/logsRepository";
import { UserRepository } from "../../domain/repositories/userRepository";

export class Authenticate {

    constructor(
        private userRepository : UserRepository,
        private hashProviderRepository : HashProviderRepository,
        private jwtProviderRepository : JWTProviderRepository,
        private logsRepository : LogsRepository
    ) {}

//execute
    async execute(data : AuthUserDTO) : Promise<any> {

        //verify if user already exist
        const user = await this.userRepository.findByEmail(data.email)

        if(!user || user.length === 0) {

            //captura o log caso inicia sessao com email errado
            await this.logsRepository.create({
                level : "ERROR",
                message : "Tentativa de iniciar sessão com e-mail incorreto.",
                metadata : {
                    Usuario : user?.[0]?.name
                }
            })

            throw new Error("E-mail ou senha incorretas!")
        }

        //verify if password hash is the same
        const verifyPassword = await this.hashProviderRepository.compareHash(data.password, user[0]?.password as any)

        if(!verifyPassword) {

            //captura o log caso inicia sessao com senha errada
            await this.logsRepository.create({
                level : "ERROR",
                message : "Tentativa de iniciar sessão com palavra-passe incorreta.",
                metadata : {
                    Usuario : user?.[0]?.name
                }
            })

            throw new Error("E-mail ou senha incorretas!")
        }

        //login bem sucedido
        //captura o log de sucesso ao iniciar login
        await this.logsRepository.create({
            level : "INFO",
            message : "Login bem sucedido",
            metadata : {
                Usuario : user?.[0]?.name
            }
        })

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