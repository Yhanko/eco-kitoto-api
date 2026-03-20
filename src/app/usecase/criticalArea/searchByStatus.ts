import { statusEnum } from "../../../http/interfaces/criticalAreaDTO";
import { CriticalArea } from "../../domain/entities/criticalArea";
import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";

export class SearchByStatus {

    constructor(private criticalAreaRepository : CriticalAreaRepository) {}

    async execute(estatus : statusEnum) : Promise<CriticalArea[] | null> {

        return await this.criticalAreaRepository.searchCriticalAreaByStatus(estatus)
    }
}