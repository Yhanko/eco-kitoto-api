import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class SearchClearEventByTime {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(eventTime : string) : Promise<ClearEvent[] | null> {

        return await this.clearEventRepository.searchClearEventByTime(eventTime)
    }
}