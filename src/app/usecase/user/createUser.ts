import { CreateUserDTO } from "../../../http/interfaces/userDTO";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/userRepository";

export class CreateUser {

    constructor(private userRepository : UserRepository) {}

    async execute(data : CreateUserDTO) {

        const user = new User (
            data.iduser,
            data.name,
            data.email,
            data.password,
            data.telephone,
            data.typeUser as any,
            data.districtId
        )

        await this.userRepository.create(user)

        return user
    }
}