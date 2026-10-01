import { Publish, typePublish } from "../entities/publish";

export interface PublishRepository {
    listAll() : Promise<Publish[] | null>
    listMyPublish(id_user : string) : Promise<Publish[] | null>
    listAllReation(id_publish : string) : Promise<number>
    create(publish : Publish) : Promise<Publish>
    update(id_publish: string, type_publish: typePublish, comentary: string, volunteer_quantity: number, trash_quantity: number,
        location: string
    ) : Promise<Publish>
    addReation(id_publish : string, reation : number) : Promise<void>
    removeReation(id_publish : string, reation : number) : Promise<void>
    delete(id_publish : string) : Promise<void>
}