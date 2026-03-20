import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";

export class DeleteArea {

    constructor(private criticalAreaRepository : CriticalAreaRepository) {}

    async execute(idcriticalArea : string) : Promise<void> {

        return await this.criticalAreaRepository.delete(idcriticalArea)
    }
}