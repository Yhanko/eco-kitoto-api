import { desc, eq } from "drizzle-orm";
import { Publish, typePublish } from "../../app/domain/entities/publish";
import { PublishRepository } from "../../app/domain/repositories/publishRepository";
import { db } from "../database/db";
import { publishTable, userTable } from "../database/schema";
import { CreatePublishDTO } from "../../http/interfaces/publishDTO";

export class DrizzlePublishRepository implements PublishRepository {
    constructor() {}

//list all
    async listAll(): Promise<Publish[] | null> {
        const listAll = await db.select({
            //publish data
            id_publish : publishTable.id_publish,
            type_publish : publishTable.type_publish,
            comentary : publishTable.comentary,
            volunteer_quantity : publishTable.volunteer_quantity,
            trash_quantity : publishTable.trash_quantity,
            image_url : publishTable.image_url,
            video_url : publishTable.video_url,
            location : publishTable.location,
            reation : publishTable.reation,
            createdAt : publishTable.createdAt,
            
            //user data
            user_id : publishTable.user_id,
            userName : userTable.name,
            userProfile : userTable.typeUser,   
        })
        .from(publishTable)
        .innerJoin(userTable, eq(publishTable.user_id, userTable.iduser))
        .orderBy(desc(publishTable.createdAt))  
        
        return listAll.map(p => ({
            id_publish : p.id_publish ?? "",
            type_publish : p.type_publish!,
            comentary : p.comentary!,
            volunteer_quantity : p.volunteer_quantity ?? undefined,
            trash_quantity : p.trash_quantity ?? undefined,
            image_url : p.image_url ?? [],
            video_url : p.video_url ?? "",
            location : p.location ?? "",
            reation : p.reation ?? 0,

            user_id : p.user_id ?? "",
            userName : p.userName ?? "",
            userProfile : p.userProfile ?? "",
            createdAt : p.createdAt!
        }))
    }

//list my publish
    async listMyPublish(id_user: string): Promise<Publish[] | null> {
        const listAll = await db.select({
            //publish data
            id_publish : publishTable.id_publish,
            type_publish : publishTable.type_publish,
            comentary : publishTable.comentary,
            volunteer_quantity : publishTable.volunteer_quantity,
            trash_quantity : publishTable.trash_quantity,
            image_url : publishTable.image_url,
            video_url : publishTable.video_url,
            location : publishTable.location,
            reation : publishTable.reation,
            createdAt : publishTable.createdAt,
            
            //user data
            user_id : publishTable.user_id,
            userName : userTable.name,
            userProfile : userTable.typeUser,   
        })
        .from(publishTable)
        .innerJoin(userTable, eq(publishTable.user_id, userTable.iduser))
        .where(eq(publishTable.user_id, id_user))
        .orderBy(desc(publishTable.createdAt))  
        
        return listAll.map(p => ({
            id_publish : p.id_publish ?? "",
            type_publish : p.type_publish!,
            comentary : p.comentary!,
            volunteer_quantity : p.volunteer_quantity ?? undefined,
            trash_quantity : p.trash_quantity ?? undefined,
            image_url : p.image_url ?? [],
            video_url : p.video_url ?? "",
            location : p.location ?? "",
            reation : p.reation ?? 0,

            user_id : p.user_id ?? "",
            userName : p.userName ?? "",
            userProfile : p.userProfile ?? "",
            createdAt : p.createdAt!
        }))
    }

//list all publish reation
    async listAllReation(id_publish: string): Promise<number> {
        
        const allReation = await db.select({
            reation : publishTable.reation
        })
        .from(publishTable)
        .where(eq(publishTable.id_publish, id_publish))
        .limit(1)

        return allReation[0]?.reation!
    }

//create
    async create(data: CreatePublishDTO): Promise<Publish> {
        
        const [publish] = await db.insert(publishTable).values({
            user_id : data.user_id,
            type_publish : data.type_publish,
            comentary : data.comentary,
            volunteer_quantity : data.volunteer_quantity,
            trash_quantity : data.trash_quantity,
            reation : data.reation,
            image_url : data.image_url,
            video_url : data.video_url,
            location : data.location
        }).returning()

        return {
            id_publish : publish?.id_publish ?? "",
            user_id : publish?.user_id ?? "",
            type_publish : publish?.type_publish!,
            comentary : publish?.comentary!,
            volunteer_quantity : publish?.volunteer_quantity ?? undefined,
            trash_quantity : publish?.trash_quantity ?? undefined,
            reation : publish?.reation ?? 0,
            image_url : publish?.image_url ?? [],
            video_url : publish?.video_url ?? "",
            location : publish?.location ?? ""
        }
    }

//update
    async update(id_publish: string, type_publish: typePublish, comentary: string, 
        volunteer_quantity: number, trash_quantity: number, location: string): Promise<Publish> {
        
        const [publish] = await db.update(publishTable).set({
            type_publish : type_publish,
            comentary : comentary,
            volunteer_quantity : volunteer_quantity,
            trash_quantity : trash_quantity,
            location : location
        }).returning()
        .where(eq(publishTable.id_publish, id_publish))

        return {
            id_publish : publish?.id_publish ?? "",
            user_id : publish?.user_id ?? "",
            type_publish : publish?.type_publish!,
            comentary : publish?.comentary!,
            volunteer_quantity : publish?.volunteer_quantity ?? undefined,
            trash_quantity : publish?.trash_quantity ?? undefined,
            reation : publish?.reation ?? 0,
            image_url : publish?.image_url ?? [],
            video_url : publish?.video_url ?? "",
            location : publish?.location ?? ""
        }
    }

//reation update
    async addReation(id_publish: string, reation: number): Promise<void> {
        
        await db.update(publishTable).set({
            reation : reation + 1
        })
        .where(eq(publishTable.id_publish, id_publish))
        .returning()
    }

//remove reation
    async removeReation(id_publish: string, reation: number): Promise<void> {
        
        await db.update(publishTable).set({
            reation : reation - 1
        })
        .where(eq(publishTable.id_publish, id_publish))
        .returning()
    }

//delete
    async delete(id_publish: string): Promise<void> {
        await db.delete(publishTable).where(eq(publishTable.id_publish, id_publish))
    }
}