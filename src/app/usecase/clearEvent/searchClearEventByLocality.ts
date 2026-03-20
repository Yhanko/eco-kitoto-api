import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class SearchClearEventByLocality {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(locality : string) : Promise<ClearEvent[] | null> {

        return await this.clearEventRepository.searchClearEventByLocality(locality)
    }
}