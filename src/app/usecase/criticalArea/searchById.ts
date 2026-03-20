import { CriticalArea } from "../../domain/entities/criticalArea";
import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";

export class SearchById {

    constructor(private criticalAreaRepository : CriticalAreaRepository) {}

    async execute(idcriticalArea : string) : Promise<CriticalArea[] | null> {

        return await this.criticalAreaRepository.searchCriticalAreaById(idcriticalArea)
    }
}