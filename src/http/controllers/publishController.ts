import { Request, Response } from "express";
import { DrizzlePublishRepository } from "../../infra/repositories/drizzlePublishRepository";
import { ListAll } from "../../app/usecase/publish/listAll";
import { ListMyPublish } from "../../app/usecase/publish/listMyPublish";
import { id } from "date-fns/locale";
import { ListAllReation } from "../../app/usecase/publish/listAllReation";
import { Create } from "../../app/usecase/publish/create";
import { DrizzleUserRepository } from "../../infra/repositories/drizzleUserRepository";
import { Update } from "../../app/usecase/publish/update";
import { AddReation } from "../../app/usecase/publish/addReation";
import { RemoveReation } from "../../app/usecase/publish/removeReation";
import { DeletePublish } from "../../app/usecase/publish/deletePublish";

export class PublishController {
    constructor() {}

//list all publish
    async listAllPublish(request : Request, response : Response) {

        const drizzlePublishRepository = new DrizzlePublishRepository()
        const listAll = new ListAll(drizzlePublishRepository)

        try {
            const publish = await listAll.execute()

            return response.status(200).json(publish)
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

// all user´s publish
    async allMyPublish(request : Request, response : Response) {
        
        const id_user = String(request.params.id)

        if(!id_user) {
            return response.status(400).json({ message : "Busca inválida!"})
        }

        const drizzlePublishRepository = new DrizzlePublishRepository()
        const myPublish = new ListMyPublish(drizzlePublishRepository)

        try {
            const publish = await myPublish.execute(id_user)
            
            return response.status(200).json(publish)
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

//list all publish reation
    async publishReation(request : Request, response : Response) {

        const id_publish = String(request.params.id)

        if(!id_publish) {
            return response.status(400).json({ message : "Publicação não encontrada!"})
        }

        const drizzlePublishRepository = new DrizzlePublishRepository()
        const publishReation = new ListAllReation(drizzlePublishRepository)

        try {
            const reation = await publishReation.execute(id_publish)
            
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

//create publish
    async create(request : Request, response : Response) {

        const { user_id, type_publish, comentary, volunteer_quantity, trash_quantity,
            reation, image_url, video_url, location } = request.body
        
        if(!user_id) {
            return response.status(400).json({ message : "Usuário obrigatório!"})
        }

        if(!comentary) {
            return response.status(400).json({ message : "É obrigatório escrever um comentário!"})
        }

        const drizzlePublishRepository = new DrizzlePublishRepository()
        const drizzleUserRepository = new DrizzleUserRepository()

        const create = new Create(
            drizzleUserRepository,
            drizzlePublishRepository
        )

        try {
            const newUser = {
                user_id : user_id,
                type_publish : type_publish,
                comentary : comentary,
                volunteer_quantity : Number(volunteer_quantity),
                trash_quantity : Number(trash_quantity),
                reation : Number(reation),
                image_url : image_url,
                video_url : video_url,
                location : location
            }

            const publish = await create.execute(newUser)

            return response.status(201).json(publish)
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

// update publish
    async updatePublish(request : Request, response : Response) {

        const id_publish = String(request.params.id)

        const { type_publish, comentary, volunteer_quantity, 
            trash_quantity, location } = request.body
        
        if(!id_publish) {
            return response.status(400).json({ message : "Nenhuma publicação selecionada!"})
        }

        if(!comentary) {
            return response.status(400).json({ message : "Nenhum comentário foi escrito. Adiciona um comentário!"})
        }

        const drizzlePublishRepository = new DrizzlePublishRepository()
        const update = new Update(drizzlePublishRepository)

        try {
                const publish = await update.execute(
                    id_publish,
                    type_publish,
                    comentary,
                    volunteer_quantity,
                    trash_quantity,
                    location)

                return response.status(201).json(publish)
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

//add reation on the publish
    async addReation(request : Request, response : Response) {

        const id_publish = String(request.params.id)
        const { reation } = request.body

        if(!id_publish) {
            return response.status(400).json({ message : "Publicação não encontrada!"})
        }

        if(!reation) {
            return
        }

        const drizzlePublishRepository = new DrizzlePublishRepository()
        const addReation = new AddReation(drizzlePublishRepository)

        try {
                const publish = await addReation.execute(id_publish, Number(reation))

                return response.status(201).json(publish)
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

//remove reation on the publish
    async removeReation(request : Request, response : Response) {

        const id_publish = String(request.params.id)
        const { reation } = request.body

        if(!id_publish) {
            return response.status(400).json({ message : "Publicação não encontrada!"})
        }

        if(!reation) {
            return
        }

        const drizzlePublishRepository = new DrizzlePublishRepository()
        const removeReation = new RemoveReation(drizzlePublishRepository)

        try {
                const publish = await removeReation.execute(id_publish, Number(reation))

                return response.status(201).json(publish)
        } catch (error : any) {
            return response.status(404).json({ message : error.message })
        }
    }

//delete
    async delete(request : Request, response : Response) {
        
        const id_publish = String(request.params.id)

        if(!id_publish) {
            return response.status(400).json({ message : "Publicação não encontrada!"})
        }

        const drizzlePublishRepository = new DrizzlePublishRepository()
        const deletePublish = new DeletePublish(drizzlePublishRepository)

        try {
                await deletePublish.execute(id_publish)

                return response.status(201).json({ message : "Publicação eliminada com sucesso!"})
        } catch(error : any) {
            return response.status(404).json({ message : error.message })
        }
    }
}