import { desc, eq } from "drizzle-orm";
import { Comentary } from "../../app/domain/entities/comentary";
import { ComentaryRepository } from "../../app/domain/repositories/comentaryRepository";
import { db } from "../database/db";
import { comentaryTable, publishTable, userTable } from "../database/schema";
import { CreateComentaryDTO } from "../../http/interfaces/comentaryDTO";

export class DrizzleComentaryRepository implements ComentaryRepository {
    constructor() {}

//list publish comentary
    async listPublishComentary(publish_id: string): Promise<Comentary[]> {
        const listComentary = await db.select({
            id_comentary : comentaryTable.id_comentary,
            user_id : comentaryTable.user_id,
            userName : userTable.name,
            publish_id : comentaryTable.publish_id,
            text_comentary : comentaryTable.text_comentary,
            reation : comentaryTable.reation,
            createdAt : comentaryTable.createdAt
        })
        .from(comentaryTable)
        .innerJoin(userTable, eq(comentaryTable.user_id, userTable.iduser))
        .innerJoin(publishTable, eq(comentaryTable.publish_id, publishTable.id_publish))
        .where(eq(comentaryTable.publish_id, publish_id))
        .orderBy(desc(comentaryTable.createdAt))

        return listComentary.map(p => ({
            id_comentary : p.id_comentary ?? "",
            user_id : p.user_id ?? "",
            userName : p.userName ?? "",
            publish_id : p.publish_id ?? "",
            text_comentary : p.text_comentary ?? "",
            reation : p.reation ?? undefined,
            createdAt : p.createdAt!
        }))
    }

//çist all comentary reation
    async listComentaryReation(id_comentary: string): Promise<number> {
        
        const allReation = await db.select({
            reation : comentaryTable.reation
        })
        .from(comentaryTable)
        .where(eq(comentaryTable.id_comentary, id_comentary))
        .limit(1)

        return allReation[0]?.reation!
    }

//find by id
    async findById(id_comentary: string): Promise<Comentary[] | null> {
        const listComentary = await db.select({
            id_comentary : comentaryTable.id_comentary,
            user_id : comentaryTable.user_id,
            userName : userTable.name,
            publish_id : comentaryTable.publish_id,
            text_comentary : comentaryTable.text_comentary,
            reation : comentaryTable.reation,
            createdAt : comentaryTable.createdAt
        })
        .from(comentaryTable)
        .innerJoin(userTable, eq(comentaryTable.user_id, userTable.iduser))
        .innerJoin(publishTable, eq(comentaryTable.publish_id, publishTable.id_publish))
        .where(eq(comentaryTable.id_comentary, id_comentary))
        .orderBy(desc(comentaryTable.createdAt))

        return listComentary.map(p => ({
            id_comentary : p.id_comentary ?? "",
            user_id : p.user_id ?? "",
            userName : p.userName ?? "",
            publish_id : p.publish_id ?? "",
            text_comentary : p.text_comentary ?? "",
            reation : p.reation ?? undefined,
            createdAt : p.createdAt!
        }))
    }

//create
    async create(data : CreateComentaryDTO): Promise<Comentary> {
        const [comentary] = await db.insert(comentaryTable).values({
            text_comentary : data.text_comentary,
            user_id : data.user_id,
            publish_id : data.publish_id
        }).returning()

        return {
            id_comentary : comentary?.id_comentary ?? "",
            text_comentary : comentary?.text_comentary ?? "",
            user_id : comentary?.user_id ?? "",
            publish_id : comentary?.publish_id ?? "",
            reation : comentary?.reation ?? undefined
        }
    }

//update
    async update(id_comentary: string, text_comentary: string): Promise<Comentary> {
        const [comentary] = await db.update(comentaryTable).set({
          text_comentary : text_comentary  
        })
        .where(eq(comentaryTable.id_comentary, id_comentary))
        .returning()

        return {
            id_comentary : comentary?.id_comentary ?? "",
            text_comentary : comentary?.text_comentary ?? "",
            user_id : comentary?.user_id ?? "",
            publish_id : comentary?.publish_id ?? "",
            reation : comentary?.reation ?? undefined
        }
    }

//addReation
    async addReation(id_comentary: string, reation: number): Promise<void> {
        
        await db.update(comentaryTable).set({
            reation : reation + 1
        })
        .where(eq(comentaryTable.id_comentary, id_comentary))
        .returning()
    }

//removeReation
    async removeReation(id_comentary: string, reation: number): Promise<void> {
       
        await db.update(comentaryTable).set({
            reation : reation - 1
        })
        .where(eq(comentaryTable.id_comentary, id_comentary))
        .returning()
    }

//delete
    async delete(id_comentary: string): Promise<void> {
        await db.delete(comentaryTable).where(eq(comentaryTable.id_comentary, id_comentary))
    }
}