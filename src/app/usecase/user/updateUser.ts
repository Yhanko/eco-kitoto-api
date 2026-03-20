import { UserRepository } from "../../domain/repositories/userRepository";

export class UpdateUser {

    constructor(private userRepository : UserRepository) {}

    async execute(iduser: string, name: string, telephone: string, districtId: string) {

        return await this.userRepository.update(iduser, name, telephone, districtId)
    }
}