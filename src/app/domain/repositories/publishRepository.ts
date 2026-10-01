import { Publish, typePublish } from "../entities/publish";

export interface PublishRepository {
    listAll() : Promise<Publish[] | null>
    listMyPublish(id_user : string) : Promise<Publish[] | null>
    create(publish : Publish) : Promise<Publish>
    update(id_publish: string, type_publish: typePublish, comentary: string, volunteer_quantity: number, trash_quantity: number,
        location: string
    ) : Promise<Publish>
    updateReation(id_publish : string, reation : number) : Promise<Publish>
    delete(id_publish : string) : Promise<void>
}