import { Publish } from "../../domain/entities/publish";
import { PublishRepository } from "../../domain/repositories/publishRepository";

export class FindById {
    constructor(public publishRepository : PublishRepository) {}

    async execute(id_publish : string) : Promise<Publish[] | null> {
        return await this.publishRepository.findById(id_publish)
    }
}