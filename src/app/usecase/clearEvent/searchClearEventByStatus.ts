import { statusEnum } from "../../../http/interfaces/clearEventDTO";
import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class SearchClearEventByStatus {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(estatus : statusEnum) : Promise<ClearEvent[] | null> {

        return await this.clearEventRepository.searchClearEventByStatus(estatus)
    }
}