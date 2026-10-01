import { PublishRepository } from "../../domain/repositories/publishRepository";

export class RemoveReation {
    constructor(private publishRepository : PublishRepository) {}

    async execute(id_publish : string, reation : number) : Promise<void> {
        return await this.publishRepository.removeReation(id_publish, reation)
    }
}