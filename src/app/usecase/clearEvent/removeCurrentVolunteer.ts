import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class RemoveCurrentVolunteer {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(idEvent : string, current_volunteer : number) : Promise<ClearEvent> {

        return await this.clearEventRepository.removeCurrentVolunteer(idEvent, current_volunteer)
    }
}