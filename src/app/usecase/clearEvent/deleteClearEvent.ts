import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class DeleteClearEvent {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(idEvent : string) : Promise<void> {

        return await this.clearEventRepository.delete(idEvent)
    }
}