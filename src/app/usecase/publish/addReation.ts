import { PublishRepository } from "../../domain/repositories/publishRepository";

export class AddReation {
    constructor(private publishRepository : PublishRepository) {}

    async execute(id_publish : string, reation : number) : Promise<void> {
        return await this.publishRepository.addReation(id_publish, reation)
    }
}