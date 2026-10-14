import { Comentary } from "../entities/comentary";

export interface ComentaryRepository {
    listPublishComentary(publish_id : string) : Promise<Comentary[]>
    listComentaryReation(id_comentary : string) : Promise<number>
    create(comentary : Comentary) : Promise<Comentary>
    update(id_comentary: string, text_comentary: string) : Promise<Comentary>
    addReation(id_comentary: string, reation: number) : Promise<void>
    removeReation(id_comentary: string, reation: number) : Promise<void>
    delete(id_comentary : string) : Promise<void>
    findById(id_comentary: string) : Promise<Comentary[] | null>
}