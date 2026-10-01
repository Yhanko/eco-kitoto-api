import { PublishRepository } from "../../domain/repositories/publishRepository";

export class DeletePublish {
    constructor(private publishRepository : PublishRepository) {}

    async execute(id_publish : string) : Promise<void> {
        return this.publishRepository.delete(id_publish)
    }
}