import { Request, Response } from "express";
import { ListAll } from "../../app/usecase/municipality/listAllMunicipalities";
import { DrizzleMunicipalityRepository } from "../../infra/repositories/drizzleMunicipalityRepository";
import { CreateMunicipality } from "../../app/usecase/municipality/createMunicipality";
import { UpdateMunicipality } from "../../app/usecase/municipality/updateMunicipality";
import { DeleteMunicipality } from "../../app/usecase/municipality/deleteMunicipality";
import { SearchByName } from "../../app/usecase/municipality/searchByName";

export class MunicipalityController {
    
    constructor() {}

//list all
    async listAll(request : Request, response : Response) {

        const drizzleMunicipalityRepository = new DrizzleMunicipalityRepository()
        const listAll = new ListAll(drizzleMunicipalityRepository)

        try {
            
            const municipality =  await listAll.execute()

            return response.json(municipality) 

        } catch (error) {
            
            return response.json({ error : "Erro ao listar municípios!"})
        }
    }

//create
    async create(request : Request, response : Response) {

        const { name, provinceId } = request.body

        if(!name || !provinceId) {
            return response.json({ message : "Preencha todos os campos para salvar!"})
        }

        const drizzleMunicipalityRepository = new DrizzleMunicipalityRepository()
        const createMunicipality = new CreateMunicipality(drizzleMunicipalityRepository)

        try {
            const municipality = await createMunicipality.execute({
                name : name,
                provinceId : provinceId
            })

            return response.json(municipality)

        } catch (error) {
            return response.json({ error : "Erro ao salvar o município!"})
        }
    }

//update
    async update(request : Request, response : Response) {

        const idmunicipality = String(request.params.id)
        const { name, provinceId } = request.body

        if(!name || !provinceId) {
            return response.json({ message : "Preencha os campos antes de continuar"})
        }

        const drizzleMunicipalityRepository = new DrizzleMunicipalityRepository()
        const updateMunicipality = new UpdateMunicipality(drizzleMunicipalityRepository)

        try {
            
            const municipality = await updateMunicipality.execute(idmunicipality, name, provinceId)

            return response.json(municipality)

        } catch (error) {
            return response.json({ error : "Erro ao atualizar dados do município!"})
        }
    }

//delete
    async delete(request : Request, response : Response) {

        const idmunicipality = String(request.params.id)

        if(!idmunicipality) {
            return response.json({ message : "Município não encontrado!"})
        }

        const drizzleMunicipalityRepository = new DrizzleMunicipalityRepository()
        const deleteMunicipality = new DeleteMunicipality(drizzleMunicipalityRepository)

        try {
                await deleteMunicipality.execute(idmunicipality)

                return response.json({ message : "Município eliminado com sucesso!"})

        } catch (error) {
            return response.json({ error : "Erro ao eliminar município!"})
        }
    }

//search by name
    async searchByName(request : Request, response : Response) {

        const name = String(request.params.name)

        if(!name) {
            return response.json({ message : "Município não enocntrado!"})
        }

        const drizzleMunicipalityRepository = new DrizzleMunicipalityRepository()
        const searchMunicipality = new SearchByName(drizzleMunicipalityRepository)

        try {
                const municipality = await searchMunicipality.execute(name)

                return response.json(municipality)

        } catch (error) {
            console.error(error)
            return response.json({ error : "Erro ao pesquisar município!"})
        }
    }
}