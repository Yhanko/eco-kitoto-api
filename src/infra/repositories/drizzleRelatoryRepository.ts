import { eq } from "drizzle-orm";
import { Relatory } from "../../app/domain/entities/relatory";
import { RelatoryRepository } from "../../app/domain/repositories/relatoryRepository";
import { db } from "../database/db";
import { clearEventTable, criticalAreaTable, districtTable, municipalityTable, provinceTable, relatoryTable, userTable } from "../database/schema";
import { CreateRelatoryDTO } from "../../http/interfaces/relatoryDTO";
import { after, before } from "node:test";

export class DrizzleRelatoryRepository implements RelatoryRepository {

    constructor() {}

//list all
    async listAll(): Promise<Relatory[] | null> {
        
        const listAll = await db.select({
            idrelatory : relatoryTable.id_relatory,
            eventId : relatoryTable.eventId,
            eventTitle : clearEventTable.title,
            responsibleUser : userTable.name,
            telehone : userTable.telephone,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            eventDate : clearEventTable.eventDate,
            eventTime: clearEventTable.eventTime,
            volunteers : clearEventTable.current_volunteer,
            before_image : relatoryTable.before_image,
            after_image : relatoryTable.after_image,
            observation : relatoryTable.observation,
            status : criticalAreaTable.estatus,
            sendDate : relatoryTable.date_send
        }).from(relatoryTable)
        .innerJoin(clearEventTable, eq(relatoryTable.eventId, clearEventTable.id_event))
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))

        return listAll.map(p => ({
            idrelatory : p.idrelatory ?? "",
            eventId : p.eventId ?? "",
            eventTitle : p.eventTitle ?? "",
            responsibleUser : p.responsibleUser ?? "",
            telephone : p.telehone ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            eventDate : p.eventDate ?? "",
            eventTime : p.eventTime ?? "",
            volunteers : p.volunteers ?? 0,
            before_image : p.before_image ?? "",
            after_image : p.after_image ?? "",
            observation : p.observation ?? "",
            status : p.status!,
            sendDate : p.sendDate!
        }))
    }

//insert
    async create(data : CreateRelatoryDTO): Promise<Relatory> {

        const [relatory] = await db.insert(relatoryTable).values({
            eventId : data.eventId,
            before_image : data.before_image,
            after_image : data.after_image,
            observation : data.observation
        }).returning()

        return {
            idrelatory : relatory?.id_relatory ?? "",
            eventId : relatory?.eventId ?? "",
            before_image : relatory?.before_image ?? "",
            after_image : relatory?.after_image ?? "",
            observation : relatory?.observation ?? ""
        }
    }

//update
    async update(idrelatory: string, eventId: string, before_image: string, after_image: string, observation: string): Promise<Relatory> {
        
        const [relatory] = await db.update(relatoryTable).set({
            eventId : eventId,
            before_image : before_image,
            after_image : after_image,
            observation : observation
        }).where(eq(relatoryTable.id_relatory, idrelatory))
        .returning()

        return {
            idrelatory : relatory?.id_relatory ?? "",
            eventId : relatory?.eventId ?? "",
            before_image : relatory?.before_image ?? "",
            after_image : relatory?.after_image ?? "",
            observation : relatory?.observation ?? ""
        }
    }

//delete
    async delete(idrelatory: string): Promise<void> {
        await db.delete(relatoryTable).where(eq(relatoryTable.id_relatory, idrelatory))
    }

//search by id
    async searchRelatoryById(idrelatory: string): Promise<Relatory[] | null> {
        
        const listAll = await db.select({
            idrelatory : relatoryTable.id_relatory,
            eventId : relatoryTable.eventId,
            eventTitle : clearEventTable.title,
            responsibleUser : userTable.name,
            telehone : userTable.telephone,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            eventDate : clearEventTable.eventDate,
            eventTime: clearEventTable.eventTime,
            volunteers : clearEventTable.current_volunteer,
            before_image : relatoryTable.before_image,
            after_image : relatoryTable.after_image,
            observation : relatoryTable.observation,
            status : criticalAreaTable.estatus,
            sendDate : relatoryTable.date_send
        }).from(relatoryTable)
        .innerJoin(clearEventTable, eq(relatoryTable.eventId, clearEventTable.id_event))
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .where(eq(relatoryTable.id_relatory, idrelatory))
        .orderBy(relatoryTable.date_send)

        return listAll.map(p => ({
            idrelatory : p.idrelatory ?? "",
            eventId : p.eventId ?? "",
            eventTitle : p.eventTitle ?? "",
            responsibleUser : p.responsibleUser ?? "",
            telephone : p.telehone ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            eventDate : p.eventDate ?? "",
            eventTime : p.eventTime ?? "",
            volunteers : p.volunteers ?? 0,
            before_image : p.before_image ?? "",
            after_image : p.after_image ?? "",
            observation : p.observation ?? "",
            status : p.status!,
            sendDate : p.sendDate!
        }))
    }

//search by event id
    async searchRelatoryByEventId(eventId: string): Promise<Relatory[] | null> {
        
        const listAll = await db.select({
            idrelatory : relatoryTable.id_relatory,
            eventId : relatoryTable.eventId,
            eventTitle : clearEventTable.title,
            responsibleUser : userTable.name,
            telehone : userTable.telephone,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            eventDate : clearEventTable.eventDate,
            eventTime: clearEventTable.eventTime,
            volunteers : clearEventTable.current_volunteer,
            before_image : relatoryTable.before_image,
            after_image : relatoryTable.after_image,
            observation : relatoryTable.observation,
            status : criticalAreaTable.estatus,
            sendDate : relatoryTable.date_send
        }).from(relatoryTable)
        .innerJoin(clearEventTable, eq(relatoryTable.eventId, clearEventTable.id_event))
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .where(eq(relatoryTable.eventId, eventId))
        .orderBy(relatoryTable.date_send)

        return listAll.map(p => ({
            idrelatory : p.idrelatory ?? "",
            eventId : p.eventId ?? "",
            eventTitle : p.eventTitle ?? "",
            responsibleUser : p.responsibleUser ?? "",
            telephone : p.telehone ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            eventDate : p.eventDate ?? "",
            eventTime : p.eventTime ?? "",
            volunteers : p.volunteers ?? 0,
            before_image : p.before_image ?? "",
            after_image : p.after_image ?? "",
            observation : p.observation ?? "",
            status : p.status!,
            sendDate : p.sendDate!
        }))
    }

//search by send date
    async searchRelatoryBySendDate(sendDate: Date): Promise<Relatory[] | null> {
        
        const listAll = await db.select({
            idrelatory : relatoryTable.id_relatory,
            eventId : relatoryTable.eventId,
            eventTitle : clearEventTable.title,
            responsibleUser : userTable.name,
            telehone : userTable.telephone,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            eventDate : clearEventTable.eventDate,
            eventTime: clearEventTable.eventTime,
            volunteers : clearEventTable.current_volunteer,
            before_image : relatoryTable.before_image,
            after_image : relatoryTable.after_image,
            observation : relatoryTable.observation,
            status : criticalAreaTable.estatus,
            sendDate : relatoryTable.date_send
        }).from(relatoryTable)
        .innerJoin(clearEventTable, eq(relatoryTable.eventId, clearEventTable.id_event))
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .where(eq(relatoryTable.date_send, sendDate))
        .orderBy(relatoryTable.date_send)

        return listAll.map(p => ({
            idrelatory : p.idrelatory ?? "",
            eventId : p.eventId ?? "",
            eventTitle : p.eventTitle ?? "",
            responsibleUser : p.responsibleUser ?? "",
            telephone : p.telehone ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            eventDate : p.eventDate ?? "",
            eventTime : p.eventTime ?? "",
            volunteers : p.volunteers ?? 0,
            before_image : p.before_image ?? "",
            after_image : p.after_image ?? "",
            observation : p.observation ?? "",
            status : p.status!,
            sendDate : p.sendDate!
        }))
    }
}