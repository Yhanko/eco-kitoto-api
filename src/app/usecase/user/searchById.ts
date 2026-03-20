import { UserResponseDTO } from "../../../http/interfaces/userDTO";
import { UserRepository } from "../../domain/repositories/userRepository";

export class SearchUserById {

    constructor(private userRepository : UserRepository) {}

    async execute(iduser : string) : Promise<UserResponseDTO[] | null> {

        return await this.userRepository.searchById(iduser)
    }
}