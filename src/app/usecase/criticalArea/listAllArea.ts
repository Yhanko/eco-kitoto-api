import { CriticalArea } from "../../domain/entities/criticalArea";
import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";

export class ListAllArea {

    constructor(private criticalAreaRepository : CriticalAreaRepository) {}

    async execute() : Promise<CriticalArea[] | null> {

        return await this.criticalAreaRepository.listAll()
    }
}