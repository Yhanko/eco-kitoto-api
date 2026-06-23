import { Request, Response } from "express";
import { DrizzleDistrictRepository } from "../../infra/repositories/drizzleDistrictRepository";
import { ListAllDistrict } from "../../app/usecase/district/listAllDistrict";
import { CreateDistrict } from "../../app/usecase/district/createDistrict";
import { UpdateDistrict } from "../../app/usecase/district/updateDistrict";
import { DeleteDistrict } from "../../app/usecase/district/deleteDistrict";
import { SearchByDistrictName } from "../../app/usecase/district/searchByName";

export class DistrictController {
    constructor() {}

//list all
    async listAll(request : Request, response : Response) {

        const drizzleDistrictRepository = new DrizzleDistrictRepository()
        const listAll = new ListAllDistrict(drizzleDistrictRepository)

        try {
            const district = await listAll.execute()

            return response.json(district)

        } catch (error) {
            return response.json({ error : "Erro ao listar distritos!"})
        }
    }

//insert
    async create(request : Request, response : Response) {

        const { name, municipalityId } = request.body

        if(!name || !municipalityId) {
            return response.json({ message : "Campos inválidos!"})
        }

        const drizzleDistrictRepository = new DrizzleDistrictRepository()
        const createDistrict = new CreateDistrict(drizzleDistrictRepository)

        try {
            const district = await createDistrict.execute({
                name : name,
                municipalityId : municipalityId
            })

            return response.json(district)

        } catch (error) {
            return response.json({ error : "Erro ao salvar distrito!"})
        }
    }

//update
    async update(request : Request, response : Response) {

        const id_district = String(request.params.id)
        const { name, municipalityId } = request.body

        if(!name || !municipalityId) {
            return response.json({ error : "Campos inválidos!"})
        }

        const drizzleDistrictRepository = new DrizzleDistrictRepository()
        const updateDistrict = new UpdateDistrict(drizzleDistrictRepository)

        try {
                const district = await updateDistrict.execute(id_district, name, municipalityId)

                return response.json(district)  

        } catch (error) {
            return response.json({ error : "Erro ao atualizar os dados do distrito!"})
        }
    }

//delete
    async delete(request : Request, response : Response) {

        const id_district = String(request.params.id)

        if(!id_district) {
            return response.json({ message : "Município não encontrado!"})
        }

        const drizzleDistrictRepository = new DrizzleDistrictRepository()
        const deleteDistrict = new DeleteDistrict(drizzleDistrictRepository)

        try {
                await deleteDistrict.execute(id_district)

                return response.json({ message : "Distrito eliminado com sucesso!"})

        } catch (error) {
            return response.json({ error : "Erro ao eliminar distrito!"})
        }
    }

//search by name
    async searchByName(request : Request, response : Response) {

        const name = String(request.params.name)

        if(!name) {
            return response.json({ message : "Nome inválido!"})
        }

        const drizzleDistrictRepository = new DrizzleDistrictRepository()
        const searchDistrict = new SearchByDistrictName(drizzleDistrictRepository)

        try {
            const district = await searchDistrict.execute(name)

            return response.json(district)

        } catch (error) {
            return response.json({ error : "Erro ao pesquisar distrito!"})
        }
    }
}