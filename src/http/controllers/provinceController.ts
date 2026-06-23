import { Request, Response } from "express";
import { DrizzleProvinceRepository } from "../../infra/repositories/drizzleProvinceRepository";
import { ListAllProvince } from "../../app/usecase/province/listAllProvince";
import { CreateProvince } from "../../app/usecase/province/createProvince";
import { UpdateProvince } from "../../app/usecase/province/updateProvince";
import { DeleteProvince } from "../../app/usecase/province/deleteProvince";
import { SearchByProvince } from "../../app/usecase/province/searchByName";

export class ProvinceController {
    constructor() {}

// list all
    async listAll(request : Request, response : Response) {

        const drizzleProvinceRepository = new DrizzleProvinceRepository()
        const listAll = new ListAllProvince(drizzleProvinceRepository)

        try {
            
            const provinces = await listAll.execute()

            return response.json(provinces)

        } catch (error) {
            
            console.error(error)

            return response.json({ error : "Erro ao listar as províncias!"})
        }
    }

//create
    async create(request : Request, response : Response) {

        const { name } = request.body

        if(!name) {

            return response.json({ message : "Preencha os campos para salvar!"})
        }

        const drizzleProvinceRepository = new DrizzleProvinceRepository()
        const createProvince = new CreateProvince(drizzleProvinceRepository)
        
        try {

            const province = await createProvince.execute({
                name : name
            })

            return response.json(province)

        } catch (error) {
            
            return response.json({ error : "Erro ao salvar província."})
        }
    }

//update
    async update(request : Request, response : Response) {

        const idprovince = String(request.params.id)
        const { name } = request.body
        
        if(!idprovince || !name) {

            return response.json({ message : "A província não existe!"})
        }

        const drizzleProvinceRepository = new DrizzleProvinceRepository()
        const updateProvince = new UpdateProvince(drizzleProvinceRepository)

        try {
            
            const province = await updateProvince.execute(idprovince, name)

            return response.json(province)

        } catch (error) {
            
            return response.json({ error : "Erro ao atualizar a província!"})
        }
    }

//delete
    async delete(request : Request, response : Response) {

        const idprovince = String(request.params.id)

        if(!idprovince) {

            return response.json({ message : "Província não encontrada!"})
        }

        const drizzleProvinceRepository = new DrizzleProvinceRepository()
        const deleteProvince = new DeleteProvince(drizzleProvinceRepository)

        try {
                await deleteProvince.execute(idprovince)

                return response.json({ message : "Província eliminada com sucesso!"})

        } catch (error) {
            
            return response.json({ error : "Erro ao eliminar província!"})
        }
    }

//search by name
    async searchByName(request : Request, response : Response) {

        const name = String(request.params.name)

        if(!name) {

            return response.json({ message : "Província não encontrada!"})
        }

        const drizzleProvinceRepository = new DrizzleProvinceRepository()
        const searchProvince = new SearchByProvince(drizzleProvinceRepository)

        try {
            
            const province = await searchProvince.execute(name)

            return response.json(province)

        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar província!"})
        }
    }
}