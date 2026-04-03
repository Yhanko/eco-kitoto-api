import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class SearchClearEventByRespoDateTime {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(userId: string, date : Date, time: string) : Promise<ClearEvent[] | null> {

        return await this.clearEventRepository.searchClearEventByResponsibleAndDateAndTime(userId, date, time)
    }
}