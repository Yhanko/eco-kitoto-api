import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class UpdateCurrentVolunteer {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(idEvent : string, volunteers : number) : Promise<void> {
        return await this.clearEventRepository.updateCurrentVolunteer(idEvent, volunteers)
    }
}