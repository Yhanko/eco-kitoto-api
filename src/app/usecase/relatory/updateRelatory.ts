import { Relatory } from "../../domain/entities/relatory";
import { RelatoryRepository } from "../../domain/repositories/relatoryRepository";

export class UpdateRelatory {
    constructor(private relatoryRepository : RelatoryRepository) {}

    async execute(idrelatory: string, eventId: string, before_image: string,
        after_image: string, observation: string
    ) : Promise<Relatory> {

        return await this.relatoryRepository.update(
            idrelatory,
            eventId,
            before_image,
            after_image,
            observation
        )
    }
}