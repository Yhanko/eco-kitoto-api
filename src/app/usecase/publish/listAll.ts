import { Publish } from "../../domain/entities/publish";
import { PublishRepository } from "../../domain/repositories/publishRepository";

export class ListAll {
    constructor(private publishRepository : PublishRepository) {}

    async execute() : Promise<Publish[] | null> {
        return await this.publishRepository.listAll()
    }
}