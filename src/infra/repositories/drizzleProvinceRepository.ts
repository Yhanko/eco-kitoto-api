import { eq } from "drizzle-orm";
import { Province } from "../../app/domain/entities/province";
import { ProvinceRepository } from "../../app/domain/repositories/provinceRepository";
import { CreateProvinceDTO } from "../../http/interfaces/provinceDTO";
import { db } from "../database/db";
import { provinceTable } from "../database/schema";

export class DrizzleProvinceRepository implements ProvinceRepository {

    constructor() {}

//list all province
    async listAll(): Promise<Province[]> {
        
        const listAll = await db.select({
            idprovince : provinceTable.idprovince,
            province : provinceTable.name,
        }).from(provinceTable).orderBy(provinceTable.name)

        return listAll.map(p => ({
            idprovince : p.idprovince,
            name : p.province,
        }))
    }

// insert
    async create(data : CreateProvinceDTO): Promise<Province> {

        const [createProvince] = await db.insert(provinceTable).values({
            name : data.name
        }).returning()

        return {
            idprovince : createProvince?.idprovince ?? '',
            name : createProvince?.name ?? ''
        }
    }

// update
    async update(idprovince : string, name : string): Promise<Province> {
        
        const [updateProvince] = await db.update(provinceTable).set({
            name : name
        }).where(eq(provinceTable.idprovince, idprovince)).returning()

        return {
            idprovince : updateProvince?.idprovince ?? "",
            name : updateProvince?.name ?? ""
        }
    }

//delete
    async delete(idprovince : string): Promise<void> {
        await db.delete(provinceTable).where(eq(provinceTable.idprovince, idprovince))
    }

//search by name of province
    async searchByProvince(name: string): Promise<Province[] | null> {

        const user = await db.select()
        .from(provinceTable)
        .where(eq(provinceTable.name, name))

        return user.map(p => ({
            idprovince : p.idprovince ?? '',
            name : p.name ?? ''
        }))
    }
}