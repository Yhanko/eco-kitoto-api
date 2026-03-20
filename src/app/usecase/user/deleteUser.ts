import { UserRepository } from "../../domain/repositories/userRepository";

export class DeleteUser {

    constructor(private userRepository : UserRepository) {}

    async execute(iduser : string) {

        return await this.userRepository.delete(iduser)
    }
}