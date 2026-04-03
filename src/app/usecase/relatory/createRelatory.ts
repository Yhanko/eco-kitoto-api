import { CreateRelatoryDTO } from "../../../http/interfaces/relatoryDTO";
import { Relatory } from "../../domain/entities/relatory";
import { RelatoryRepository } from "../../domain/repositories/relatoryRepository";

export class CreateRelatory {
    constructor(private relatoryRepository : RelatoryRepository) {}

    async execute(data : CreateRelatoryDTO) : Promise<Relatory> {
        
        //verify if relatory is already exist
        const existingRelatory = await this.relatoryRepository.searchRelatoryByEventId(data.eventId)

        if(existingRelatory?.length) {
            throw new Error("Já existe um relatório deste evento!")
        }

        const relatory = new Relatory(
            data.idrelatory,
            data.eventId,
            data.before_image,
            data.after_image,
            data.observation
        )

       return await this.relatoryRepository.create(relatory)
    }
}