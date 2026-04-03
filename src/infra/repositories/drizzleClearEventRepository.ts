import { and, eq } from "drizzle-orm";
import { ClearEvent } from "../../app/domain/entities/clearEvent";
import { ClearEventRepository } from "../../app/domain/repositories/clearEventRepository";
import { ClearEventResponseDTO, CreateClearEventDTO, statusEnum } from "../../http/interfaces/clearEventDTO";
import { db } from "../database/db";
import { clearEventTable, criticalAreaTable, districtTable, municipalityTable, provinceTable, userTable } from "../database/schema";

export class DrizzleClearEventRepository implements ClearEventRepository {

    constructor() {}

//list all
    async listAll(): Promise<ClearEvent[] | null> {
        
        const listAllEvent = await db.select({
            idEvent : clearEventTable.id_event,
            title : clearEventTable.title,
            descrition : clearEventTable.descrition,
            areaId : clearEventTable.areaId,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            image : criticalAreaTable.image,
            responsibleId : clearEventTable.responsibleId,
            responsibleName : userTable.name,
            telephone : userTable.telephone,
            eventDate : clearEventTable.eventDate,
            eventTime : clearEventTable.eventTime,
            meeting_point : clearEventTable.meeting_point,
            max_volunteer : clearEventTable.max_volunteer,
            current_volunteer : clearEventTable.current_volunteer,
            estatus : clearEventTable.estatus
        })
        .from(clearEventTable)
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .orderBy(clearEventTable.eventDate)

        return listAllEvent.map(p => ({
            idEvent : p.idEvent ?? "",
            title : p.title ?? "",
            descrition : p.descrition ?? "",
            areaId : p.areaId ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            image : p.image ?? "",
            responsibleId : p.responsibleId ?? "",
            responsibleName : p.responsibleName ?? "",
            telephone : p.telephone ?? "",
            eventDate : p.eventDate!,
            eventTime : p.eventTime ?? "",
            meeting_point : p.meeting_point ?? "",
            max_volunteer : p.max_volunteer!,
            current_volunteer : p.current_volunteer!,
            estatus : p.estatus as any
        }))
    }

//create
    async create(data : CreateClearEventDTO): Promise<ClearEvent> {
    
        const [createEvent] = await db.insert(clearEventTable).values({
            id_event : data.idEvent,
            title : data.title,
            areaId : data.areaId,
            responsibleId : data.responsibleId,
            eventDate : String(data.eventDate),
            eventTime : data.eventTime,
            descrition : data.descrition,
            max_volunteer : data.max_volunteer,
            current_volunteer : data.current_volunteer,
            meeting_point : data.meeting_point,
            estatus : data.estatus
        }).returning()

        return {
            idEvent : createEvent?.id_event ?? "",
            title : createEvent?.title ?? "",
            areaId : createEvent?.areaId ?? "",
            responsibleId : createEvent?.responsibleId ?? "",
            eventDate : createEvent?.eventDate!,
            eventTime : createEvent?.eventTime ?? "",
            descrition : createEvent?.descrition ?? "",
            max_volunteer : createEvent?.max_volunteer!,
            current_volunteer : createEvent?.current_volunteer!,
            meeting_point : createEvent?.meeting_point ?? "",
            estatus : createEvent?.estatus as any
        }
    }

//update
    async update(idEvent: string, title: string, areaId: string, responsibleId: string, eventDate: string,
        eventTime: string, descrition: string, max_volunteer: number, 
        meeting_point: string, estatus: statusEnum): Promise<ClearEventResponseDTO> {
        
        const [updateEvent] = await db.update(clearEventTable).set({
            title : title,
            areaId : areaId,
            responsibleId : responsibleId,
            eventDate : eventDate,
            eventTime : eventTime,
            descrition : descrition,
            max_volunteer : max_volunteer,
            meeting_point : meeting_point,
            estatus : estatus
        })
        .where(eq(clearEventTable.id_event, idEvent))
        .returning()

        return {
            idEvent : updateEvent?.id_event ?? "",
            title : updateEvent?.title ?? "",
            areaId : updateEvent?.areaId ?? "",
            responsibleId : updateEvent?.responsibleId ?? "",
            eventDate : updateEvent?.eventDate ?? "",
            eventTime : updateEvent?.eventTime ?? "",
            descrition : updateEvent?.descrition ?? "",
            max_volunteer : updateEvent?.max_volunteer!,
            meeting_point : updateEvent?.meeting_point ?? "",
            estatus : updateEvent?.estatus as any
        }
    }

//update current_volunteer
    async updateCurrentVolunteer(idEvent: string, current_volunteer: number): Promise<void> {
        
        await db.update(clearEventTable).set({
            current_volunteer : current_volunteer + 1
        }).where(eq(clearEventTable.id_event, idEvent)).returning()
    }

//remove current volunteer
    async removeCurrentVolunteer(idEvent: string, current_volunteer: number): Promise<void> {
        
        await db.update(clearEventTable).set({
            current_volunteer : current_volunteer - 1
        }).where(eq(clearEventTable.id_event, idEvent))
        .returning()
    }

//delete
    async delete(idEvent: string): Promise<void> {

        await db.delete(clearEventTable).where(eq(clearEventTable.id_event, idEvent))
    }

//get max volunteer by id
    async getMaxVolunteerById(idEvent: string): Promise<number> {
        
        const max_volunteer = await db.select({
            max_volunteer : clearEventTable.max_volunteer
        }).from(clearEventTable)
        .where(eq(clearEventTable.id_event, idEvent))
        .limit(1)

        return max_volunteer[0]?.max_volunteer!
    }

//get current volunteer by id
    async getCurrentVolunteerById(idEvent: string): Promise<number> {
        
        const current_volunteer = await db.select({
            current_volunteer : clearEventTable.current_volunteer
        }).from(clearEventTable)
        .where(eq(clearEventTable.id_event, idEvent))
        .limit(1)

        return current_volunteer[0]?.current_volunteer!
    }

//search by id
    async searchClearEnventById(idEvent: string): Promise<ClearEvent[] | null> {
        
        const ClearEvent = await db.select({
            idEvent : clearEventTable.id_event,
            title : clearEventTable.title,
            descrition : clearEventTable.descrition,
            areaId : clearEventTable.areaId,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            image : criticalAreaTable.image,
            responsibleId : clearEventTable.responsibleId,
            responsibleName : userTable.name,
            telephone : userTable.telephone,
            eventDate : clearEventTable.eventDate,
            eventTime : clearEventTable.eventTime,
            meeting_point : clearEventTable.meeting_point,
            max_volunteer : clearEventTable.max_volunteer,
            current_volunteer : clearEventTable.current_volunteer,
            estatus : clearEventTable.estatus
        })
        .from(clearEventTable)
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .where(eq(clearEventTable.id_event, idEvent))
        .orderBy(clearEventTable.eventDate)

        return ClearEvent.map(p => ({
            idEvent : p.idEvent ?? "",
            title : p.title ?? "",
            descrition : p.descrition ?? "",
            areaId : p.areaId ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            image : p.image ?? "",
            responsibleId : p.responsibleId ?? "",
            responsibleName : p.responsibleName ?? "",
            telephone : p.telephone ?? "",
            eventDate : p.eventDate!,
            eventTime : p.eventTime ?? "",
            meeting_point : p.meeting_point ?? "",
            max_volunteer : p.max_volunteer!,
            current_volunteer : p.current_volunteer!,
            estatus : p.estatus as any
        }))
    }

//search by responsible user name
    async searchClearEventByResponsibleUser(userName: string): Promise<ClearEvent[] | null> {
        
        const ClearEvent = await db.select({
            idEvent : clearEventTable.id_event,
            title : clearEventTable.title,
            descrition : clearEventTable.descrition,
            areaId : clearEventTable.areaId,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            image : criticalAreaTable.image,
            responsibleId : clearEventTable.responsibleId,
            responsibleName : userTable.name,
            telephone : userTable.telephone,
            eventDate : clearEventTable.eventDate,
            eventTime : clearEventTable.eventTime,
            meeting_point : clearEventTable.meeting_point,
            max_volunteer : clearEventTable.max_volunteer,
            current_volunteer : clearEventTable.current_volunteer,
            estatus : clearEventTable.estatus
        })
        .from(clearEventTable)
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .where(eq(userTable.name, userName))
        .orderBy(clearEventTable.eventDate)

        return ClearEvent.map(p => ({
            idEvent : p.idEvent ?? "",
            title : p.title ?? "",
            descrition : p.descrition ?? "",
            areaId : p.areaId ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            image : p.image ?? "",
            responsibleId : p.responsibleId ?? "",
            responsibleName : p.responsibleName ?? "",
            telephone : p.telephone ?? "",
            eventDate : p.eventDate!,
            eventTime : p.eventTime ?? "",
            meeting_point : p.meeting_point ?? "",
            max_volunteer : p.max_volunteer!,
            current_volunteer : p.current_volunteer!,
            estatus : p.estatus as any
        }))
    }

//search by date
    async searchClearEventByDate(date: Date): Promise<ClearEvent[] | null> {
        
        const ClearEvent = await db.select({
            idEvent : clearEventTable.id_event,
            title : clearEventTable.title,
            descrition : clearEventTable.descrition,
            areaId : clearEventTable.areaId,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            image : criticalAreaTable.image,
            responsibleId : clearEventTable.responsibleId,
            responsibleName : userTable.name,
            telephone : userTable.telephone,
            eventDate : clearEventTable.eventDate,
            eventTime : clearEventTable.eventTime,
            meeting_point : clearEventTable.meeting_point,
            max_volunteer : clearEventTable.max_volunteer,
            current_volunteer : clearEventTable.current_volunteer,
            estatus : clearEventTable.estatus
        })
        .from(clearEventTable)
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .where(eq(clearEventTable.eventDate, String(date)))
        .orderBy(clearEventTable.eventDate)

        return ClearEvent.map(p => ({
            idEvent : p.idEvent ?? "",
            title : p.title ?? "",
            descrition : p.descrition ?? "",
            areaId : p.areaId ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            image : p.image ?? "",
            responsibleId : p.responsibleId ?? "",
            responsibleName : p.responsibleName ?? "",
            telephone : p.telephone ?? "",
            eventDate : p.eventDate!,
            eventTime : p.eventTime ?? "",
            meeting_point : p.meeting_point ?? "",
            max_volunteer : p.max_volunteer!,
            current_volunteer : p.current_volunteer!,
            estatus : p.estatus as any
        }))
    }

//search by time
    async searchClearEventByTime(time: string): Promise<ClearEvent[] | null> {
        
        const ClearEvent = await db.select({
            idEvent : clearEventTable.id_event,
            title : clearEventTable.title,
            descrition : clearEventTable.descrition,
            areaId : clearEventTable.areaId,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            image : criticalAreaTable.image,
            responsibleId : clearEventTable.responsibleId,
            responsibleName : userTable.name,
            telephone : userTable.telephone,
            eventDate : clearEventTable.eventDate,
            eventTime : clearEventTable.eventTime,
            meeting_point : clearEventTable.meeting_point,
            max_volunteer : clearEventTable.max_volunteer,
            current_volunteer : clearEventTable.current_volunteer,
            estatus : clearEventTable.estatus
        })
        .from(clearEventTable)
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .where(eq(clearEventTable.eventTime, time))
        .orderBy(clearEventTable.eventDate)

        return ClearEvent.map(p => ({
            idEvent : p.idEvent ?? "",
            title : p.title ?? "",
            descrition : p.descrition ?? "",
            areaId : p.areaId ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            image : p.image ?? "",
            responsibleId : p.responsibleId ?? "",
            responsibleName : p.responsibleName ?? "",
            telephone : p.telephone ?? "",
            eventDate : p.eventDate!,
            eventTime : p.eventTime ?? "",
            meeting_point : p.meeting_point ?? "",
            max_volunteer : p.max_volunteer!,
            current_volunteer : p.current_volunteer!,
            estatus : p.estatus as any
        }))
    }

//search by locality
    async searchClearEventByLocality(locality: string): Promise<ClearEvent[] | null> {
        
        const ClearEvent = await db.select({
            idEvent : clearEventTable.id_event,
            title : clearEventTable.title,
            descrition : clearEventTable.descrition,
            areaId : clearEventTable.areaId,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            image : criticalAreaTable.image,
            responsibleId : clearEventTable.responsibleId,
            responsibleName : userTable.name,
            telephone : userTable.telephone,
            eventDate : clearEventTable.eventDate,
            eventTime : clearEventTable.eventTime,
            meeting_point : clearEventTable.meeting_point,
            max_volunteer : clearEventTable.max_volunteer,
            current_volunteer : clearEventTable.current_volunteer,
            estatus : clearEventTable.estatus
        })
        .from(clearEventTable)
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .where(eq(districtTable.name, locality))
        .orderBy(clearEventTable.eventDate)

        return ClearEvent.map(p => ({
            idEvent : p.idEvent ?? "",
            title : p.title ?? "",
            descrition : p.descrition ?? "",
            areaId : p.areaId ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            image : p.image ?? "",
            responsibleId : p.responsibleId ?? "",
            responsibleName : p.responsibleName ?? "",
            telephone : p.telephone ?? "",
            eventDate : p.eventDate!,
            eventTime : p.eventTime ?? "",
            meeting_point : p.meeting_point ?? "",
            max_volunteer : p.max_volunteer!,
            current_volunteer : p.current_volunteer!,
            estatus : p.estatus as any
        }))
    }

//search by status
    async searchClearEventByStatus(estatus: statusEnum): Promise<ClearEvent[] | null> {
        
        const ClearEvent = await db.select({
            idEvent : clearEventTable.id_event,
            title : clearEventTable.title,
            descrition : clearEventTable.descrition,
            areaId : clearEventTable.areaId,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            image : criticalAreaTable.image,
            responsibleId : clearEventTable.responsibleId,
            responsibleName : userTable.name,
            telephone : userTable.telephone,
            eventDate : clearEventTable.eventDate,
            eventTime : clearEventTable.eventTime,
            meeting_point : clearEventTable.meeting_point,
            max_volunteer : clearEventTable.max_volunteer,
            current_volunteer : clearEventTable.current_volunteer,
            estatus : clearEventTable.estatus
        })
        .from(clearEventTable)
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .where(eq(clearEventTable.estatus, estatus))
        .orderBy(clearEventTable.eventDate)

        return ClearEvent.map(p => ({
            idEvent : p.idEvent ?? "",
            title : p.title ?? "",
            descrition : p.descrition ?? "",
            areaId : p.areaId ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            image : p.image ?? "",
            responsibleId : p.responsibleId ?? "",
            responsibleName : p.responsibleName ?? "",
            telephone : p.telephone ?? "",
            eventDate : p.eventDate!,
            eventTime : p.eventTime ?? "",
            meeting_point : p.meeting_point ?? "",
            max_volunteer : p.max_volunteer!,
            current_volunteer : p.current_volunteer!,
            estatus : p.estatus as any
        }))
    }

//search clear event by user id and date and time
    async searchClearEventByResponsibleAndDateAndTime(userId: string, date: Date, time: string): Promise<ClearEvent[] | null> {
        
        const ClearEvent = await db.select({
            idEvent : clearEventTable.id_event,
            title : clearEventTable.title,
            descrition : clearEventTable.descrition,
            areaId : clearEventTable.areaId,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            image : criticalAreaTable.image,
            responsibleId : clearEventTable.responsibleId,
            responsibleName : userTable.name,
            telephone : userTable.telephone,
            eventDate : clearEventTable.eventDate,
            eventTime : clearEventTable.eventTime,
            meeting_point : clearEventTable.meeting_point,
            max_volunteer : clearEventTable.max_volunteer,
            current_volunteer : clearEventTable.current_volunteer,
            estatus : clearEventTable.estatus
        })
        .from(clearEventTable)
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .where(and(
            eq(clearEventTable.responsibleId, userId),
            eq(clearEventTable.eventDate, String(date)),
            eq(clearEventTable.eventTime, time)
        ))
        .orderBy(clearEventTable.eventDate)

        return ClearEvent.map(p => ({
            idEvent : p.idEvent ?? "",
            title : p.title ?? "",
            descrition : p.descrition ?? "",
            areaId : p.areaId ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            image : p.image ?? "",
            responsibleId : p.responsibleId ?? "",
            responsibleName : p.responsibleName ?? "",
            telephone : p.telephone ?? "",
            eventDate : p.eventDate!,
            eventTime : p.eventTime ?? "",
            meeting_point : p.meeting_point ?? "",
            max_volunteer : p.max_volunteer!,
            current_volunteer : p.current_volunteer!,
            estatus : p.estatus as any
        }))
    }
}