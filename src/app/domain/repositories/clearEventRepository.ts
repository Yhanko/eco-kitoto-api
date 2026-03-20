import { ClearEventResponseDTO, statusEnum } from "../../../http/interfaces/clearEventDTO";
import { ClearEvent } from "../entities/clearEvent";

export interface ClearEventRepository {
    create(clearEvent : ClearEvent) : Promise<ClearEvent>
    update(idEvent: string, title: string, areaId: string, responsibleId: string, eventDate: string,
        eventTime: string, descrition: string, max_volunteer: number, 
        meeting_point: string, estatus: statusEnum) : Promise<ClearEventResponseDTO>
    updateCurrentVolunteer(idEvent: string, current_volunteer: number) : Promise<void>
    removeCurrentVolunteer(idEvent: string, current_volunteer: number) : Promise<void>
    delete(idEvent : string) : Promise<void>
    listAll() : Promise<ClearEvent[] | null>
    getCurrentVolunteerById(idEvent : string) : Promise<number>
    getMaxVolunteerById(idEvent : string) : Promise<number>
    searchClearEnventById(idEvent : string) : Promise<ClearEvent[] | null>
    searchClearEventByResponsibleUser(userName : string) : Promise<ClearEvent[] | null>
    searchClearEventByLocality(locality : string) : Promise<ClearEvent[] | null>
    searchClearEventByDate(date : Date) : Promise<ClearEvent[] | null>
    searchClearEventByTime(time : string) : Promise<ClearEvent[] | null>
    searchClearEventByStatus(estatus : statusEnum) : Promise<ClearEvent[] | null>
}