import { clearEventStatusEnum } from "../../infra/database/schema";

export type statusEnum = (typeof clearEventStatusEnum.enumValues)[number]

export interface CreateClearEventDTO {
    idEvent : string,
    title : string,
    areaId : string,
    responsibleId : string,
    eventDate : Date | string,
    eventTime : string,
    descrition : string,
    max_volunteer : number,
    current_volunteer : number,
    meeting_point : string,
    estatus : statusEnum
}

export interface ClearEventResponseDTO {
    idEvent : string,
    title : string,
    areaId : string,
    responsibleId : string,
    eventDate : string,
    eventTime : string,
    descrition : string,
    max_volunteer : number,
    meeting_point : string,
    estatus : statusEnum
}