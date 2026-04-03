import { CreateClearEventDTO } from "../../../http/interfaces/clearEventDTO";
import { ClearEvent } from "../../domain/entities/clearEvent";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class CreateClearEvent {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async execute(data : CreateClearEventDTO) : Promise<ClearEvent> {

        /*
            verify if exist a clear event with the same user responsible and 
            the same date event and the same time event
        */
       const existingEvent = await this.clearEventRepository.searchClearEventByResponsibleAndDateAndTime(
        data.responsibleId, data.eventDate, data.eventTime
       )

       if(existingEvent?.length) {
            throw new Error("Não pode criar dois ou mais eventos na mesma data e hora!")
       }

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