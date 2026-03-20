import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class SearchClearEventByResponsibleUser {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(userName : string) : Promise<ClearEvent[] | null> {

        return await this.clearEventRepository.searchClearEventByResponsibleUser(userName)
    }
}