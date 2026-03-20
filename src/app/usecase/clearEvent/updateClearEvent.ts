import { ClearEventResponseDTO, statusEnum } from "../../../http/interfaces/clearEventDTO";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";

export class UpdateClearEvent {

    constructor(private clearEventRepository : ClearEventRepository) {}

    async update(idEvent: string, title: string, areaId: string, responsibleId: string, eventDate: Date,
        eventTime: string, descrition: string, max_volunteer: number, meeting_point: string, 
        estatus: statusEnum
    ) : Promise<ClearEventResponseDTO> {

        return await this.clearEventRepository.update(
            idEvent,
            title,
            areaId,
            responsibleId,
            String(eventDate),
            eventTime,
            descrition,
            max_volunteer,
            meeting_point,
            estatus
        )
    }
}