import { eq } from "drizzle-orm";
import { VolunteerParticipation } from "../../app/domain/entities/volunteerParticipation";
import { VolunteerParticipationRepository } from "../../app/domain/repositories/volunteerParticipationRepository";
import { db } from "../database/db";
import { clearEventTable, criticalAreaTable, districtTable, municipalityTable, participationTable, provinceTable, userTable } from "../database/schema";
import { CreateVolunteerParticipationDTO } from "../../http/interfaces/volunteerParticipationDTO";

export class DrizzleVolunteerParticipationRepository implements VolunteerParticipationRepository {

    constructor() {}

//list all
    async listAll(): Promise<VolunteerParticipation[] | null> {
        
        const listAll = await db.select({
            idparticipation : participationTable.id_participation,
            eventId : participationTable.eventId,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            image : criticalAreaTable.image,
            eventDate : clearEventTable.eventDate,
            eventTime : clearEventTable.eventTime,
            descrition_event: clearEventTable.descrition,
            volunteerId : participationTable.volunteerId,
            volunteerName : userTable.name,
            volunteerTelephone : userTable.telephone,
            pontuation : participationTable.pontuation,
            estatus : participationTable.estatus
        })
        .from(participationTable)
        .innerJoin(userTable, eq(participationTable.volunteerId, userTable.iduser))
        .innerJoin(clearEventTable, eq(participationTable.eventId, clearEventTable.id_event))
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        
        return listAll.map(p => ({
            idparticipation : p.idparticipation ?? "",
            eventId : p.eventId ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            image : p.image ?? "",
            eventDate : p.eventDate ?? "",
            eventTime : p.eventTime ?? "",
            descrition_event : p.descrition_event ?? "",
            volunteerId : p.volunteerId ?? "",
            volunteerName : p.volunteerName ?? "",
            volunteerTelephone : p.volunteerTelephone ?? "",
            pontuation : p.pontuation ?? 0,
            estatus : p.estatus!
        }))
    }

//create
    async create(data : CreateVolunteerParticipationDTO): Promise<VolunteerParticipation> {

        const [volunteerParticipation] = await db.insert(participationTable).values({
            id_participation : data.idparticipation,
            eventId : data.eventId,
            volunteerId : data.volunteerId,
            pontuation : data.pontuation,
            estatus : data.estatus
        }).returning()

        return {
            idparticipation : volunteerParticipation?.id_participation ?? "",
            eventId : volunteerParticipation?.eventId ?? "",
            volunteerId : volunteerParticipation?.volunteerId ?? "",
            pontuation : volunteerParticipation?.pontuation ?? 0,
            estatus : volunteerParticipation?.estatus as any
        }
    }

//pontuation update
    async pontuationUpdate(idparticipation: string, pontuation: number): Promise<void> {
        
        await db.update(participationTable).set({
            pontuation : pontuation
        })
        .where(eq(participationTable.id_participation, idparticipation))
        .returning()
    }

//delete
    async delete(idparticipation: string): Promise<void> {
        
        await db.delete(participationTable)
        .where(eq(participationTable.id_participation, idparticipation))
    }

//search by participation id
    async searchParticipationById(idparticipation: string): Promise<VolunteerParticipation[] | null> {
        
        const listAll = await db.select({
            idparticipation : participationTable.id_participation,
            eventId : participationTable.eventId,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            image : criticalAreaTable.image,
            eventDate : clearEventTable.eventDate,
            eventTime : clearEventTable.eventTime,
            descrition_event: clearEventTable.descrition,
            volunteerId : participationTable.volunteerId,
            volunteerName : userTable.name,
            volunteerTelephone : userTable.telephone,
            pontuation : participationTable.pontuation,
            estatus : participationTable.estatus
        })
        .from(participationTable)
        .innerJoin(clearEventTable, eq(participationTable.eventId, clearEventTable.id_event))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .where(eq(participationTable.id_participation, idparticipation))
        
        return listAll.map(p => ({
            idparticipation : p.idparticipation ?? "",
            eventId : p.eventId ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            image : p.image ?? "",
            eventDate : p.eventDate ?? "",
            eventTime : p.eventTime ?? "",
            descrition_event : p.descrition_event ?? "",
            volunteerId : p.volunteerId ?? "",
            volunteerName : p.volunteerName ?? "",
            volunteerTelephone : p.volunteerTelephone ?? "",
            pontuation : p.pontuation ?? 0,
            estatus : p.estatus!
        }))
    }

//get id event on Participation Table
    async getIdEventByParticipationId(idparticipation: string): Promise<string> {
        
        const idEvent = await db.select({
            eventId : participationTable.eventId
        })
        .from(participationTable)
        .where(eq(participationTable.id_participation, idparticipation))
        .limit(1)
        
        return idEvent[0]?.eventId!
    }

//search by volunteer name
    async searchParticipationByVolunteer(volunteerName: string): Promise<VolunteerParticipation[] | null> {
        
        const listAll = await db.select({
            idparticipation : participationTable.id_participation,
            eventId : participationTable.eventId,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            image : criticalAreaTable.image,
            eventDate : clearEventTable.eventDate,
            eventTime : clearEventTable.eventTime,
            descrition_event: clearEventTable.descrition,
            volunteerId : participationTable.volunteerId,
            volunteerName : userTable.name,
            volunteerTelephone : userTable.telephone,
            pontuation : participationTable.pontuation,
            estatus : participationTable.estatus
        })
        .from(participationTable)
        .innerJoin(clearEventTable, eq(participationTable.eventId, clearEventTable.id_event))
        .innerJoin(userTable, eq(clearEventTable.responsibleId, userTable.iduser))
        .innerJoin(criticalAreaTable, eq(clearEventTable.areaId, criticalAreaTable.idcriticalArea))
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .where(eq(userTable.name, volunteerName))
        
        return listAll.map(p => ({
            idparticipation : p.idparticipation ?? "",
            eventId : p.eventId ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            image : p.image ?? "",
            eventDate : p.eventDate ?? "",
            eventTime : p.eventTime ?? "",
            descrition_event : p.descrition_event ?? "",
            volunteerId : p.volunteerId ?? "",
            volunteerName : p.volunteerName ?? "",
            volunteerTelephone : p.volunteerTelephone ?? "",
            pontuation : p.pontuation ?? 0,
            estatus : p.estatus!
        }))
    }
}