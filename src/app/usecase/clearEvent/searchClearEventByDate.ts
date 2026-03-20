import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class SearchClearEventByDate {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(eventDate : Date) : Promise<ClearEvent[] | null> {

        return await this.clearEventRepository.searchClearEventByDate(eventDate)
    }
}