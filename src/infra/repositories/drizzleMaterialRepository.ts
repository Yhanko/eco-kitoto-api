import { eq } from "drizzle-orm";
import { Material } from "../../app/domain/entities/material";
import { MaterialRepository } from "../../app/domain/repositories/material";
import { db } from "../database/db";
import { clearEventTable, materialTable } from "../database/schema";
import { CreateMaterialDTO } from "../../http/interfaces/materialDTO";

export class DrizzleMaterialRepository implements MaterialRepository {

    constructor() {}

//list all
    async listAll(): Promise<Material[] | null> {
        
        const listAll = await db.select({
            idmaterial : materialTable.id_material,
            eventId : materialTable.eventId,
            name : materialTable.name
        })
        .from(materialTable)
        .innerJoin(clearEventTable, eq(materialTable.eventId, clearEventTable.id_event))
        .orderBy(materialTable.name)

        return listAll.map(p => ({
            idmaterial : p.idmaterial ?? "",
            eventId : p.eventId ?? "",
            name : p.name ?? ""
        }))
    }

//create
    async create(data : CreateMaterialDTO): Promise<Material> {
        
        const [createMaterial] = await db.insert(materialTable).values({
            eventId : data.eventId,
            name : data.name
        }).returning()

        return {
            idmaterial : createMaterial?.id_material ?? "",
            eventId : createMaterial?.eventId ?? "",
            name : createMaterial?.name ?? ""
        }
    }

//update
    async update(idmaterial: string, name: string): Promise<Material> {
        
        const [updateMaterial] = await db.update(materialTable).set({
            id_material : idmaterial,
            name : name
        }).returning()

        return {
            idmaterial : updateMaterial?.id_material ?? "",
            eventId : updateMaterial?.eventId ?? "",
            name : updateMaterial?.name ?? ""
        }
    }

//delete
    async delete(idmaterial: string): Promise<void> {
        
        await db.delete(materialTable).where(eq(materialTable.id_material, idmaterial))
    }

//find material by event id
    async findMaterialByEventId(eventId: string): Promise<Material[] | null> {
        
        const listAll = await db.select({
            idmaterial : materialTable.id_material,
            eventId : materialTable.eventId,
            name : materialTable.name
        })
        .from(materialTable)
        .innerJoin(clearEventTable, eq(materialTable.eventId, clearEventTable.id_event))
        .orderBy(materialTable.name)
        .where(eq(materialTable.eventId, eventId))

        return listAll.map(p => ({
            idmaterial : p.idmaterial ?? "",
            eventId : p.eventId ?? "",
            name : p.name ?? ""
        }))
    }
}