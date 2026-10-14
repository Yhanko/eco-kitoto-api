import { Request, Response } from "express";
import { DrizzleComentaryRepository } from "../../infra/repositories/drizzleComentaryRepository";
import { ListPublishComentary } from "../../app/usecase/comentary/listPublishComentary";
import { ListComentaryReation } from "../../app/usecase/comentary/listComentaryReation";
import { CreateComentary } from "../../app/usecase/comentary/create";
import { DrizzleUserRepository } from "../../infra/repositories/drizzleUserRepository";
import { DrizzlePublishRepository } from "../../infra/repositories/drizzlePublishRepository";
import { Update } from "../../app/usecase/comentary/update";
import { AddReation } from "../../app/usecase/comentary/addReation";
import { RemoveReation } from "../../app/usecase/comentary/removeReation";
import { DeleteComentary } from "../../app/usecase/comentary/delete";

export class ComentaryController {
    constructor() {}

//list all publish comentary
    async listPublishComentary(request : Request, response : Response) {

        const publish_id = String(request.params.id)

        if(!publish_id || publish_id.length === 0) {
            return response.status(404).json({ message : "Publicação não enocntrada!" })
        }

        const drizzleComentaryRepository = new DrizzleComentaryRepository()
        const publishComentary = new ListPublishComentary(drizzleComentaryRepository)

        try {
            const comentary = await publishComentary.execute(publish_id)

            return response.status(200).json(comentary)
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

//list comentary reation
    async listComentaryReation(request : Request, response : Response) {

        const id_comentary = String(request.params.id)

        if(!id_comentary || id_comentary.length === 0) {
            return response.status(404).json({ message : "Comentário não encontrado!" })
        }

        const drizzleComentaryRepository = new DrizzleComentaryRepository()
        const comentaryReation = new ListComentaryReation(drizzleComentaryRepository)

        try {
            const reation = await comentaryReation.execute(id_comentary)

            return response.status(200).json(reation)

        } catch(error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

//create
    async create(request : Request, response : Response) {

        const { text_comentary, user_id, publish_id } = request.body

        if(!text_comentary) {
            return response.status(404).json({ message : "O comentário é obrigatório para continuar." })
        }

        if(!user_id) {
            return response.status(404).json({ message : "Usuário não encontrado." })
        }

        if(!publish_id) {
            return response.status(404).json({ message : "Essa publicação já não se encontra disponível." })
        }

        const drizzleComentaryRepository = new DrizzleComentaryRepository()
        const drizzleUserRepository = new DrizzleUserRepository()
        const drizzlePublishRepository = new DrizzlePublishRepository()
        const create = new CreateComentary(
            drizzleUserRepository,
            drizzlePublishRepository,
            drizzleComentaryRepository
        )

        try {
            const newComentary = {
                text_comentary : text_comentary,
                user_id : user_id,
                publish_id : publish_id
            }

            const comentary = await create.execute(newComentary)

            return response.status(201).json(comentary)
            
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

//update
    async update(request : Request, response : Response) {

        const id_comentary = String(request.params.id)
        const { text_comentary } = request.body

        if(!id_comentary) {
            return response.status(404).json({ message : "Comentário não encontrado." })
        }

        if(!text_comentary) {
            return response.status(404).json({ message : "O comentário é obrigatório." })
        }

        const drizzleComentaryRepository = new DrizzleComentaryRepository()
        const updateComentary = new Update(drizzleComentaryRepository)

        try {
            const update = await updateComentary.execute(id_comentary, text_comentary)

            return response.status(201).json(update)
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

//add reation
    async addReation(request : Request, response : Response) {
     
        const id_comentary = String(request.params.id)
        const { reation } = request.body

        if(!id_comentary) {
            return response.status(404).json({ message : "Comentário não encontrado." })
        }

        const drizzleComentaryRepository = new DrizzleComentaryRepository()
        const addReation = new AddReation(drizzleComentaryRepository)

        try {
            const comentaryReation = await addReation.execute(id_comentary, Number(reation))

            return response.status(201).json(comentaryReation)
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

//remove reation
    async removeReation(request : Request, response : Response) {
     
        const id_comentary = String(request.params.id)
        const { reation } = request.body

        if(!id_comentary) {
            return response.status(404).json({ message : "Comentário não encontrado." })
        }

        const drizzleComentaryRepository = new DrizzleComentaryRepository()
        const removeReation = new RemoveReation(drizzleComentaryRepository)

        try {
            const comentaryReation = await removeReation.execute(id_comentary, Number(reation))

            return response.status(201).json(comentaryReation)
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

//delete
    async delete(request : Request, response : Response) {
     
        const id_comentary = String(request.params.id)

        if(!id_comentary) {
            return response.status(404).json({ message : "Comentário não encontrado." })
        }

        const drizzleComentaryRepository = new DrizzleComentaryRepository()
        const deleteComentary = new DeleteComentary(drizzleComentaryRepository)

        try {
            await deleteComentary.execute(id_comentary)

            return response.status(201).json({ message : "Comentário eliminado com sucesso!" })
            
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }
}