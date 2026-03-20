import { CreateClearEventDTO } from "../../../http/interfaces/clearEventDTO";
import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class CreateClearEvent {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(data : CreateClearEventDTO) : Promise<ClearEvent> {

        const event = new ClearEvent(
            data.idEvent,
            data.title,
            data.areaId,
            data.responsibleId,
            data.eventDate,
            data.eventTime,
            data.descrition,
            data.max_volunteer,
            data.current_volunteer,
            data.meeting_point,
            data.estatus
        )

        return await this.clearEventRepository.create(event)
    }
}