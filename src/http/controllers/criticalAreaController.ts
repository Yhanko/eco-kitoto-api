import { Request, Response } from "express";
import { DrizzleCriticalAreaRepository } from "../../infra/repositories/drizzleCriticalAreaRepository";
import { ListAllArea } from "../../app/usecase/criticalArea/listAllArea";
import { CreateArea } from "../../app/usecase/criticalArea/createArea";
import { UpdateArea } from "../../app/usecase/criticalArea/updateArea";
import { DeleteArea } from "../../app/usecase/criticalArea/deleteArea";
import { SearchById } from "../../app/usecase/criticalArea/searchById";
import { SearchByCriticalLevel } from "../../app/usecase/criticalArea/searchByCriticalLevel";
import { levelEnum, statusEnum } from "../interfaces/criticalAreaDTO";
import { SearchByStatus } from "../../app/usecase/criticalArea/searchByStatus";
import { SearchByCoordenaties } from "../../app/usecase/criticalArea/searchByCoordenaties";
import { SearchByLocality } from "../../app/usecase/criticalArea/searchByLocality";
import sharp from "sharp"
import CloudinaryServices from "../../infra/services/storage/cloudinary/CloudinaryServices";
import { DrizzleLogsRepository } from "../../infra/repositories/drizzleLogsRepository";
import { CreateLogs } from "../../app/usecase/logs/createLogs";

export class CriticalAreaController {

    constructor() {}

//list all
    async listAll(request : Request, response : Response) {

        const drizzleCriticalAreaRepository = new DrizzleCriticalAreaRepository()
        const listAllArea = new ListAllArea(drizzleCriticalAreaRepository)

        try {
                const allArea = await listAllArea.execute()

                return response.json(allArea)

        } catch (error) {
            
            return response.json({ error : "Erro ao listar Áreas Críticas!"})
        }
    }

//create
    async create(request : Request, response : Response) {

        const { districtId, descrition, coordenaties, critical_level, estatus } = request.body
        
       /* if(!districtId || !descrition || !coordenaties || !critical_level) {

            return response.json({ error : "Dados inválidos! Por favor, preencha todos os dados disponíveis."})
        } */

        const drizzleCriticalAreaRepository = new DrizzleCriticalAreaRepository()
        const drizzleLogsRepository = new DrizzleLogsRepository()
        const createCriticalArea = new CreateArea(
            drizzleCriticalAreaRepository,
            drizzleLogsRepository
        )
 
        try {
                const files = request.files as { [ fieldname : string] : Express.Multer.File[] } | undefined

                //inicializacao das variaveis para guardar as URls das imagens
                let imageURL1 : string | undefined
                let imageURL2 : string | undefined
                let imageURL3 : string | undefined

                let imageURL : string | undefined //get the url image

                //listar com os nomes dos inputs
                const inputNames = ["image_1", "image_2", "image_3"]
                const uploadedUrls : { [key : string] : string} = {}

                //verify if images exists
                if(files) {
                    
                   for(const fieldName of inputNames) {

                    //verifica se o arquivo correspondente ao input atual foi enviado
                    const fileArray = files[fieldName]

                    if(fileArray && fileArray.length > 0) {
                        
                        const currentFile = fileArray[0]! //garante que na seja nulo

                        //converter image em jpg e otimizar
                        const buffer = await sharp(currentFile.buffer).jpeg({ quality : 80 }).toBuffer()
                        
                        //1024 * 1024 * 2 equivale ha 2MB
                        if(buffer.length > 1024 * 1024 * 2) {

                            return ({
                                request,
                                description : "Limite excedido!",
                                action_eng: "The image must have at most 2MB",
                                action_pt: "A imagem precisa ter no máximo 2MB",
                                message_eng: "Exceeded Image Size",
                                message_pt: "Tamanho da imagem excedido",
                            });
                        }

                        const fileName = `area-${crypto.randomUUID()}`

                        //upload para cloudinary
                        imageURL = (await CloudinaryServices.upload(
                            buffer,
                            fileName,
                            "services"
                        )) as string;

                        //guarda a URL no objecto temporario usando o nome input como chave
                        uploadedUrls[fieldName] = imageURL
                    }
                   }
                }

                // atribui os resultados para as respectivas variaveis, caso existam
                imageURL1 = uploadedUrls["image_1"]
                imageURL2 = uploadedUrls["image_2"]
                imageURL3 = uploadedUrls["image_3"]

                const area = await createCriticalArea.execute({
                    districtId : districtId,
                    descrition : descrition,
                    coordenaties : coordenaties,
                    critical_level : critical_level,
                    image_1 : imageURL!,
                    image_2 : imageURL2 || "",
                    image_3 : imageURL3 || "",
                    estatus
                })

                return response.json(area)

        } catch (error : any) {
            //log para capturar o erro a nivel da infraestrutura
            const createLog = new CreateLogs(drizzleLogsRepository)

            await createLog.execute({
                level : "ERROR",
                message : "Erro crítico na rota de cadastro de área crítica",
                metadata : {
                    Id_do_usuario_que_tentou_cadastrar: request.user.id,
                    stack_trace : error.stack,
                    ip : request.ip,
                    path: request.originalUrl
                }
            })

            return response.json({ error : "Erro ao cadastrar a Área Crítica! "})
        }
    }

//update
    async update(request : Request, response :Response) {

        const idcriticalArea = String(request.params.id)
        const { districtId, descrition, coordenaties, critical_level, image, estatus } = request.body

        if(!districtId || !descrition || !coordenaties || !critical_level || !image || !estatus) {

            return response.json({ error : "Dados inválidos! Por favor, preencha todos os dados disponíveis."})
        }

        let imageURL : string | undefined

        if(request.file) {
            //convert to JPG
            const convertedBuffer = await sharp(request.file.buffer)
            .jpeg({ quality : 80 })
            .toBuffer()

            //limite the max width to 2mb
            if(convertedBuffer.length > 1024 * 1024 * 2) {
                return ({
                    request,
                    description : "Limite excedido!",
                    action_eng: "The image must have at most 2MB",
                    action_pt: "A imagem precisa ter no máximo 2MB",
                    message_eng: "Exceeded Image Size",
                    message_pt: "Tamanho da imagem excedido",
                });
            }

            // unique name to image
            const filename = `service-${crypto.randomUUID()}`

            //upload to cloudinary
            imageURL = (await CloudinaryServices.upload(
                convertedBuffer,
                filename,
                "services"
            )) as string

        }

        const drizzleCriticalAreaRepository = new DrizzleCriticalAreaRepository()
        const updateArea = new UpdateArea(drizzleCriticalAreaRepository)
        
        try {
                const area = updateArea.execute(
                    idcriticalArea,
                    districtId,
                    descrition,
                    coordenaties,
                    critical_level,
                    imageURL!,
                    estatus)
                
                return response.json(area)

        } catch (error) {
            
            return response.json({ error : "Erro ao editar Área Crítica!"})
        }
    }

//delete
    async delete(request : Request, response : Response) {

        const idcriticalArea = String(request.params.id)

        if(!idcriticalArea) {

            return response.json({ error : "Área Crítica não encontrada!"})
        }

        const drizzleCriticalAreaRepository = new DrizzleCriticalAreaRepository()
        const deleteArea = new DeleteArea(drizzleCriticalAreaRepository)

        try {
                await deleteArea.execute(idcriticalArea)

                return response.json({ message : "Área Crítica eliminada com sucesso!"})

        } catch (error) {
            
            return response.json({ error : "Erro ao eliminar Área Crítica!"})
        }
    }

//search by id
    async searchAreaById(request : Request, response : Response) {

        const idcriticalArea = String(request.params.id)

        if(!idcriticalArea) {

            return response.json({ error : "Área Crítica não encontrada!"})
        }

        const drizzleCriticalAreaRepository = new DrizzleCriticalAreaRepository()
        const searchById = new SearchById(drizzleCriticalAreaRepository)

        try {
                const criticalArea = await searchById.execute(idcriticalArea)

                return response.json(criticalArea)

        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar Área Crítica pelo ID!"})
        }
    }

//search by critical level
    async searchByCriticalLevel(request : Request, response : Response) {

        const critical_level = String(request.params.criticidade) as levelEnum //converte para um tipo do enum

        if(!critical_level) {

            return response.json({ error : "Área Crítica não encontrada!"})
        }

        const drizzleCriticalAreaRepository = new DrizzleCriticalAreaRepository()
        const searchByCriticalLevel = new SearchByCriticalLevel(drizzleCriticalAreaRepository)

        try {
                const criticalArea = await searchByCriticalLevel.execute(critical_level)

                return response.json(criticalArea)

        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar Área Crítica pelo Nível de Criticidade!"})
        }
    }

//search by status
    async searchByStatus(request : Request, response : Response) {

        const estatus = String(request.params.status) as statusEnum

        if(!estatus) {

            return response.json({ error : "Área Crítica não encontrada!"})
        }

        const drizzleCriticalAreaRepository = new DrizzleCriticalAreaRepository()
        const searchByStatus = new SearchByStatus(drizzleCriticalAreaRepository)

        try {
                const criticalArea = await searchByStatus.execute(estatus)

                return response.json(criticalArea)

        } catch (error) {

            return response.json({ error : "Erro ao pesqusiar Área Crítica pelo Status!"})
        }
    }

//search by coordenaties
    async searchByCoordenaties(request : Request, response : Response) {

        const coordenaties = String(request.params.coordenadas)

        if(!coordenaties) {

            return response.json({ error : "Área Crítica não encontrada!"})
        }

        const drizzleCriticalAreaRepository = new DrizzleCriticalAreaRepository()
        const searchByCoordenaties = new SearchByCoordenaties(drizzleCriticalAreaRepository)

        try {
                const area = await searchByCoordenaties.execute(coordenaties)

                return response.json(area)

        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar Área Crítica pelas Coordenadas!"})
        }
    }

//search by locality
    async searchByLocality(request : Request, response : Response) {

        const locality = String(request.params.localidade)

        if(!locality) {

            return response.json({ error : "Área Crítica não encontrada!"})
        }

        const drizzleCriticalAreaRepository = new DrizzleCriticalAreaRepository()
        const searchByLocality = new SearchByLocality(drizzleCriticalAreaRepository)

        try {
                const area = await searchByLocality.execute(locality)

                return response.json(area)
                
        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar Área Crítica pela localidade!"})
        }
    }
}