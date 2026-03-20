import { CriticalArea } from "../../domain/entities/criticalArea";
import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";

export class SearchByLocality {

    constructor(private criticalAreaRepository : CriticalAreaRepository) {}

    async execute(locality : string) : Promise<CriticalArea[] | null> {

        return await this.criticalAreaRepository.searchCriticalAreaByLocality(locality)
    }
}