import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class SearchClearEventById {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(idEvent : string) : Promise<ClearEvent[] | null> {

        return await this.clearEventRepository.searchClearEnventById(idEvent)
    }
}