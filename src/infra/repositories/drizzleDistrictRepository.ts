import { eq } from "drizzle-orm";
import { District } from "../../app/domain/entities/district";
import { DistrictRepository } from "../../app/domain/repositories/districtRepository";
import { db } from "../database/db";
import { districtTable, municipalityTable, provinceTable } from "../database/schema";
import { CreateDistrictDTO } from "../../http/interfaces/districtDTO";

export class DrizzleDistrictRepository implements DistrictRepository {
    constructor() {}

//list all
    async listAll(): Promise<District[]> {
        
        const listAll = await db.select({
            id_district : districtTable.id_district,
            provinceName : provinceTable.name,
            municipalityId : districtTable.municipalityId,
            municipality : municipalityTable.name,
            name : districtTable.name
        })
        .from(districtTable)
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .orderBy(provinceTable.name)

        return listAll.map(p => ({
            id_district : p.id_district ?? "",
            province : p.provinceName ?? "",
            municipalityId : p.municipalityId ?? "",
            municipality : p.municipality ?? "",
            name : p.name ?? ""
        }))
    }

//create
    async create(data : CreateDistrictDTO): Promise<District> {

        const [createDistrict] = await db.insert(districtTable)
        .values({
            id_district : crypto.randomUUID(),
            name : data.name,
            municipalityId : data.municipalityId
        }).returning()

        return {
            id_district : createDistrict?.id_district ?? "",
            name : createDistrict?.name ?? "",
            municipalityId : createDistrict?.municipalityId ?? ""
        }
    }

//update
    async update(id_district: string, name: string, municipalityId: string): Promise<District> {

        const [district] = await db.update(districtTable)
        .set({
            name : name,
            municipalityId : municipalityId
        })
        .where(eq(districtTable.id_district, id_district)).returning()

        return {
            id_district : district?.id_district ?? "",
            name : district?.name ?? "",
            municipalityId : district?.municipalityId ?? ""
        }
    }

//delete
    async delete(id_district: string): Promise<void> {
        
        await db.delete(districtTable).where(eq(districtTable.id_district, id_district))
    }

//search by name of district
    async searchByName(name: string): Promise<District[] | null> {
        
        const district = await db.select({
            id_district : districtTable.id_district,
            province : provinceTable.name,
            municipalityId : districtTable.municipalityId,
            municipality : municipalityTable.name,
            name : districtTable.name
        })
        .from(districtTable)
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .where(eq(districtTable.name, name))

        return district.map(p => ({
            id_district : p.id_district ?? "",
            province : p.province ?? "",
            municipalityId : p.municipalityId ?? "",
            municipality : p.municipality ?? "",
            name : p.name ?? ""
        })) 
    }
}