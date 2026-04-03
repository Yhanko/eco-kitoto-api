import { Relatory } from "../entities/relatory";

export interface RelatoryRepository {
    create(relatory : Relatory) : Promise<Relatory>
    update(idrelatory: string, eventId: string, before_image: string,
        after_image: string, observation: string) : Promise<Relatory>
    delete(idrelatory: string) : Promise<void>
    listAll() : Promise<Relatory[] | null>
    searchRelatoryById(idrelatory: string) : Promise<Relatory[] | null>
    searchRelatoryByEventId(eventId: string) : Promise<Relatory[] | null>
    searchRelatoryBySendDate(sendDate : Date) : Promise<Relatory[] | null>
}