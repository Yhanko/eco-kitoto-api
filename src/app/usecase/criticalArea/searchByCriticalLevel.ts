import { levelEnum } from "../../../http/interfaces/criticalAreaDTO";
import { CriticalArea } from "../../domain/entities/criticalArea";
import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";

export class SearchByCriticalLevel {

    constructor(private criticalAreaRepository : CriticalAreaRepository) {}

    async execute(critical_level : levelEnum) : Promise<CriticalArea[] | null> {

        return await this.criticalAreaRepository.searchCriticalAreaByLevel(critical_level)
    }
}