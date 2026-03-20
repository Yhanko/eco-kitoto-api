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

        const { districtId, descrition, coordenaties, critical_level, image, estatus } = request.body
        const idcriticalArea = crypto.randomUUID()
        
        if(!districtId || !descrition || !coordenaties || !critical_level || !image) {

            return response.json({ error : "Dados inválidos! Por favor, preencha todos os dados disponíveis."})
        }

        const drizzleCriticalAreaRepository = new DrizzleCriticalAreaRepository()
        const createCriticalArea = new CreateArea(drizzleCriticalAreaRepository)

        try {
                const area = await createCriticalArea.execute({
                    idcriticalArea,
                    districtId,
                    descrition,
                    coordenaties,
                    critical_level,
                    image,
                    estatus
                })
                console.log(area)
                return response.json(area)

        } catch (error) {
            console.log(error)
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

        const drizzleCriticalAreaRepository = new DrizzleCriticalAreaRepository()
        const updateArea = new UpdateArea(drizzleCriticalAreaRepository)

        try {
                const area = updateArea.execute(
                    idcriticalArea,
                    districtId,
                    descrition,
                    coordenaties,
                    critical_level,
                    image,
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