import { eq } from "drizzle-orm";
import { CriticalArea } from "../../app/domain/entities/criticalArea";
import { CriticalAreaRepository } from "../../app/domain/repositories/criticalAreaRepository";
import { db } from "../database/db";
import { criticalAreaTable, districtTable, municipalityTable, provinceTable } from "../database/schema";
import { CreateCriticalAreaDTO, levelEnum, statusEnum } from "../../http/interfaces/criticalAreaDTO";

export class DrizzleCriticalAreaRepository implements CriticalAreaRepository {
    
    constructor() {}

//list all
    async listAll(): Promise<CriticalArea[] | null> {
        
        const listAllCriticalArea = await db.select({
            idcriticalArea : criticalAreaTable.idcriticalArea,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            districtId : criticalAreaTable.districtId,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            estatus : criticalAreaTable.estatus,
            image : criticalAreaTable.image,
            descrition : criticalAreaTable.descrition,
            createdAt : criticalAreaTable.createdAt
        })
        .from(criticalAreaTable)
        .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .orderBy(criticalAreaTable.estatus)

        return listAllCriticalArea.map(p => ({
            idcriticalArea : p.idcriticalArea ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            districtId : p.districtId ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            estatus : p.estatus as any,
            image : p.image ?? "",
            descrition : p.descrition ?? "",
            createdAt : p.createdAt!
        }))
    }

//create
    async create(data : CreateCriticalAreaDTO): Promise<CriticalArea> {
        
        const [creatArea] = await db.insert(criticalAreaTable)
        .values({
            idcriticalArea : data.idcriticalArea,
            districtId : data.districtId,
            descrition : data.descrition,
            coordenaties : data.coordenaties,
            critical_level : data.critical_level,
            image : data.image,
            estatus : data.estatus
        }).returning()

        return {
            idcriticalArea : creatArea?.idcriticalArea ?? "",
            districtId : creatArea?.districtId ?? "",
            descrition : creatArea?.descrition ?? "",
            coordenaties : creatArea?.coordenaties ?? "",
            critical_level : creatArea?.critical_level!,
            image : creatArea?.image ?? "",
            estatus : creatArea?.estatus!
        }
    }

//update
    async update(idcriticalArea: string, districtId: string, descrition: string, coordenaties: string, critical_level: levelEnum, image: string, estatus: statusEnum): Promise<CriticalArea> {
        
        const [area] = await db.update(criticalAreaTable).set({
            districtId : districtId,
            descrition : descrition,
            coordenaties : coordenaties,
            critical_level : critical_level,
            image : image,
            estatus : estatus
        })
        .where(eq(criticalAreaTable.idcriticalArea, idcriticalArea))
        .returning()

        return {
            idcriticalArea : area?.idcriticalArea ?? "",
            districtId : area?.districtId ?? "",
            descrition : area?.descrition ?? "",
            coordenaties : area?.coordenaties ?? "",
            critical_level : area?.critical_level as any,
            image : area?.image ?? "",
            estatus : area?.estatus as any
        }
    }

//delete
    async delete(id_criticalArea: string): Promise<void> {
        
        await db.delete(criticalAreaTable).where(eq(criticalAreaTable.idcriticalArea, id_criticalArea))
    }

//search by critical id
    async searchCriticalAreaById(idcriticalArea: string): Promise<CriticalArea[] | null> {
        
       const criticalArea = await db.select({
            idcriticalArea : criticalAreaTable.idcriticalArea,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            districtId : criticalAreaTable.districtId,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            estatus : criticalAreaTable.estatus,
            image : criticalAreaTable.image,
            descrition : criticalAreaTable.descrition,
            createdAt : criticalAreaTable.createdAt
       })
       .from(criticalAreaTable)
       .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
       .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
       .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
       .where(eq(criticalAreaTable.idcriticalArea, idcriticalArea))
       .orderBy(criticalAreaTable.critical_level)

       return criticalArea.map(p => ({
            idcriticalArea : p.idcriticalArea ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            districtId : p.districtId ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            estatus : p.estatus as any,
            image : p.image ?? "",
            descrition : p.descrition ?? "",
            createdAt : p.createdAt!
       }))
    }

//search by critical level
    async searchCriticalAreaByLevel(critical_level: levelEnum): Promise<CriticalArea[] | null> {
        
        const criticalArea = await db.select({
            idcriticalArea : criticalAreaTable.idcriticalArea,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            districtId : criticalAreaTable.districtId,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            estatus : criticalAreaTable.estatus,
            image : criticalAreaTable.image,
            descrition : criticalAreaTable.descrition,
            createdAt : criticalAreaTable.createdAt
       })
       .from(criticalAreaTable)
       .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
       .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
       .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
       .where(eq(criticalAreaTable.critical_level, critical_level))
       .orderBy(criticalAreaTable.critical_level)

       return criticalArea.map(p => ({
            idcriticalArea : p.idcriticalArea ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            districtId : p.districtId ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            estatus : p.estatus as any,
            image : p.image ?? "",
            descrition : p.descrition ?? "",
            createdAt : p.createdAt!
       }))
    }

//search by critical status
    async searchCriticalAreaByStatus(estatus: statusEnum): Promise<CriticalArea[] | null> {
        
        const criticalArea = await db.select({
            idcriticalArea : criticalAreaTable.idcriticalArea,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            districtId : criticalAreaTable.districtId,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            estatus : criticalAreaTable.estatus,
            image : criticalAreaTable.image,
            descrition : criticalAreaTable.descrition,
            createdAt : criticalAreaTable.createdAt
       })
       .from(criticalAreaTable)
       .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
       .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
       .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
       .where(eq(criticalAreaTable.estatus, estatus))
       .orderBy(criticalAreaTable.critical_level)

       return criticalArea.map(p => ({
            idcriticalArea : p.idcriticalArea ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            districtId : p.districtId ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            estatus : p.estatus as any,
            image : p.image ?? "",
            descrition : p.descrition ?? "",
            createdAt : p.createdAt!
       }))
    }

//search by critical coordenaties
    async searchCriticalAreaByCoordenaties(coordenaties: string): Promise<CriticalArea[] | null> {
        
        const criticalArea = await db.select({
            idcriticalArea : criticalAreaTable.idcriticalArea,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            districtId : criticalAreaTable.districtId,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            estatus : criticalAreaTable.estatus,
            image : criticalAreaTable.image,
            descrition : criticalAreaTable.descrition,
            createdAt : criticalAreaTable.createdAt
       })
       .from(criticalAreaTable)
       .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
       .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
       .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
       .where(eq(criticalAreaTable.coordenaties, coordenaties))
       .orderBy(criticalAreaTable.critical_level)

       return criticalArea.map(p => ({
            idcriticalArea : p.idcriticalArea ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            districtId : p.districtId ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            estatus : p.estatus as any,
            image : p.image ?? "",
            descrition : p.descrition ?? "",
            createdAt : p.createdAt!
       }))
    }

//search critical area by locality
    async searchCriticalAreaByLocality(locality: string): Promise<CriticalArea[] | null> {
        
        const criticalArea = await db.select({
            idcriticalArea : criticalAreaTable.idcriticalArea,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            districtId : criticalAreaTable.districtId,
            district : districtTable.name,
            coordenaties : criticalAreaTable.coordenaties,
            critical_level : criticalAreaTable.critical_level,
            estatus : criticalAreaTable.estatus,
            image : criticalAreaTable.image,
            descrition : criticalAreaTable.descrition,
            createdAt : criticalAreaTable.createdAt
       })
       .from(criticalAreaTable)
       .innerJoin(districtTable, eq(criticalAreaTable.districtId, districtTable.id_district))
       .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
       .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
       .where(eq(districtTable.name, locality))
       .orderBy(criticalAreaTable.critical_level)

       return criticalArea.map(p => ({
            idcriticalArea : p.idcriticalArea ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            districtId : p.districtId ?? "",
            district : p.district ?? "",
            coordenaties : p.coordenaties ?? "",
            critical_level : p.critical_level as any,
            estatus : p.estatus as any,
            image : p.image ?? "",
            descrition : p.descrition ?? "",
            createdAt : p.createdAt!
       }))
    }
}