import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class ListAllEvent {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute() : Promise<ClearEvent[] | null> {

        return await this.clearEventRepository.listAll()
    }
}