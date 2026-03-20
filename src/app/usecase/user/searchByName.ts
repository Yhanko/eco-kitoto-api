import { UserResponseDTO } from "../../../http/interfaces/userDTO";
import { UserRepository } from "../../domain/repositories/userRepository";

export class SearchByName {

    constructor(private userRepository : UserRepository) {}

    async execute(name : string) : Promise<UserResponseDTO[] | null> {

        return await this.userRepository.searchByName(name)
    }
}