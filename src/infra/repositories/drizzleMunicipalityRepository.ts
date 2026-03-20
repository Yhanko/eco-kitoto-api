import { eq } from "drizzle-orm";
import { Municipality } from "../../app/domain/entities/municipality";
import { MunicipalityRepository } from "../../app/domain/repositories/municipalityRepository";
import { db } from "../database/db";
import { municipalityTable, provinceTable } from "../database/schema";
import { CreateMunicipalityDTO } from "../../http/interfaces/municipalityDTO";

export class DrizzleMunicipalityRepository implements MunicipalityRepository {
    
    constructor() {}

//list all
    async listAll(): Promise<Municipality[]> {
       
        const listAll = await db.select({
            idmunicipality : municipalityTable.idmunicipality,
            provinceId : municipalityTable.provinceId,
            provinceName : provinceTable.name,
            name : municipalityTable.name
        })
        .from(municipalityTable)
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .orderBy(provinceTable.name)

        return listAll.map(p => ({
            idmunicipality : p.idmunicipality ?? "",
            provinceId : p.provinceId ?? "",
            province : p.provinceName ?? "",
            name : p.name ?? ""
        }))
    }

//insert
    async create(data : CreateMunicipalityDTO): Promise<Municipality> {
        
        const [municipality] = await db.insert(municipalityTable).values({
            
            idmunicipality : crypto.randomUUID(),
            name : data.name,
            provinceId : data.provinceId
        }).returning()

        return {
            idmunicipality : municipality?.idmunicipality ?? "",
            name : municipality?.name ?? "",
            provinceId : municipality?.provinceId ?? ""
        }
    }

// update
    async update(idmunicipality: string, name: string, provinceId: string): Promise<Municipality> {
        
        const [municipality] = await db.update(municipalityTable)
        .set({
            name : name,
            provinceId : provinceId
        })
        .where(eq(municipalityTable.idmunicipality, idmunicipality)).returning()

        return {
            idmunicipality : municipality?.idmunicipality ?? "",
            provinceId : municipality?.provinceId ?? "",
            name : municipality?.name ?? ""
        }
    }

//delete
    async delete(idmunicipality: string): Promise<void> {
        
        await db.delete(municipalityTable)
        .where(eq(municipalityTable.idmunicipality, idmunicipality))
    }

//search municipality by name
    async searchByname(name: string): Promise<Municipality[] | null> {
        
        const municipality = await db.select({
            idmunicipality : municipalityTable.idmunicipality,
            provinceId : municipalityTable.provinceId,
            province : provinceTable.name,
            name : municipalityTable.name
        })
        .from(municipalityTable)
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .where(eq(municipalityTable.name, name))

        return municipality.map(p => ({
            idmunicipality : p.idmunicipality ?? "",
            provinceId : p.provinceId ?? "",
            province : p.province ?? "",
            name : p.name ?? ""
        }))
    }
}