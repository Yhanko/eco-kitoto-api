import { UserResponseDTO } from "../../../http/interfaces/userDTO";
import { UserRepository } from "../../domain/repositories/userRepository";

export class ListAllUser {

    constructor(private userRepository : UserRepository) {}

    async execute() : Promise<UserResponseDTO[] | null> {

        return await this.userRepository.listAll()
    }
}