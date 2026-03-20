import { UserRepository } from "../../domain/repositories/userRepository";

export class SearchByEmail {

    constructor(private userRepository : UserRepository) {}

    async execute(email : string) {

        return await this.userRepository.searchByEmail(email)
    }
}