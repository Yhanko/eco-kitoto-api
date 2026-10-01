import { PublishRepository } from "../../domain/repositories/publishRepository";

export class ListAllReation {
    constructor(private publishRepository : PublishRepository) {}

    async execute(id_publish : string) : Promise<number> {
        return this.publishRepository.listAllReation(id_publish)
    }
}