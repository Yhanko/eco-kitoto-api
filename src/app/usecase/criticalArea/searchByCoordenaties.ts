import { CriticalArea } from "../../domain/entities/criticalArea";
import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";

export class SearchByCoordenaties {

    constructor(private criticalAreaRepository : CriticalAreaRepository) {}

    async execute(coordenaties : string) : Promise<CriticalArea[] | null> {

        return await this.criticalAreaRepository.searchCriticalAreaByCoordenaties(coordenaties)
    }
}