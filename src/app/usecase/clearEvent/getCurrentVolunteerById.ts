import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class GetCurrentVolunteerById {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(idEvent : string) : Promise<number> {

        return await this.clearEventRepository.getCurrentVolunteerById(idEvent)
    }
}