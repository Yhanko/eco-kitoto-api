import { Publish, typePublish } from "../../domain/entities/publish";
import { PublishRepository } from "../../domain/repositories/publishRepository";

export class Update {
    constructor(private publishRepository : PublishRepository) {}

    async execute(id_publish: string, type_publish: typePublish, comentary: string, volunteer_quantity: number, trash_quantity: number,
        location: string) : Promise<Publish> {

            return await this.publishRepository.update(
                id_publish,
                type_publish,
                comentary,
                volunteer_quantity,
                trash_quantity,
                location
            )
        }
}