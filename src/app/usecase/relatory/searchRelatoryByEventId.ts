import { Relatory } from "../../domain/entities/relatory";
import { RelatoryRepository } from "../../domain/repositories/relatoryRepository";

export class SearchRelatoryByEventId {
    constructor(private relatoryRepository : RelatoryRepository) {}

    async execute(eventId : string) : Promise<Relatory[] | null> {
        
        return this.relatoryRepository.searchRelatoryByEventId(eventId)
    }
}