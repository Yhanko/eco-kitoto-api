import { Publish } from "../../domain/entities/publish";
import { PublishRepository } from "../../domain/repositories/publishRepository";

export class ListMyPublish {
    constructor(private publishRepository : PublishRepository) {}

    async execute(user_id : string) : Promise<Publish[] | null> {
        return await this.publishRepository.listMyPublish(user_id)
    }
}