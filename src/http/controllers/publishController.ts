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
import sharp from "sharp";
import CloudinaryServices from "../../infra/services/storage/cloudinary/CloudinaryServices";

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
            reation, location } = request.body
        
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

            const files = request.files as { [ fieldname : string ] : Express.Multer.File[] } | undefined

            //inicializacao das variaveis para guardar as URls das imagens
            let image_url : string[] = []
            let video_url : string | undefined = undefined

            //verify if images or video exist
            if(files) {
                
                //processa o array de imagens
                const imageFiles = files['image_url']

                if(imageFiles && imageFiles.length > 0) {

                    image_url = await Promise.all(
                        imageFiles.map(async (file, index) => {

                            //optimizacao da imagem e conversao
                            const buffer = await sharp(file.buffer).jpeg({ quality : 80 }).toBuffer()

                            //1024 * 1024 * 2 equivale ha 2MB
                        
                            if(buffer.length > 1024 * 1024 * 2) {

                                throw new Error(`A imagem ${file.originalname} excede o limite máximo de 2MB.`)
                            }

                            //salva no cloudinary
                            const fileName = `pub_${Date.now()}_img_${index}`

                            return await CloudinaryServices.upload(
                                buffer,
                                fileName,
                                "publishes",
                                "image"
                            )
                        })
                    )
                }

                //processa o video
                const videoFiles = files["video_url"]

                if(videoFiles && videoFiles.length > 0) {

                    const videoFile = videoFiles[0]

                    if(videoFile && videoFile.buffer) {

                        const fileName = `pub_${Date.now()}_video`
                        //upload do video
                        video_url = await CloudinaryServices.upload(
                            videoFile.buffer,
                            fileName,
                            "publishes",
                            "video"
                        )
                    }
                    
                }
            }

            const newData = {
                user_id : user_id,
                type_publish : type_publish,
                comentary : comentary,
                volunteer_quantity : Number(volunteer_quantity),
                trash_quantity : Number(trash_quantity),
                reation : Number(reation),
                image_url,
                video_url,
                location : location
            }

            const publish = await create.execute(newData)

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