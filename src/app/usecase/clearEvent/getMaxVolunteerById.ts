import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class GetMaxVolunteerById {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(idEvent : string) : Promise<number> {

        return await this.clearEventRepository.getMaxVolunteerById(idEvent)
    }
}