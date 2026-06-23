import { Request, Response } from "express";
import { DrizzleUserRepository } from "../../infra/repositories/drizzleUserRepository";
import { ListAllUser } from "../../app/usecase/user/listAll";
import { CreateUser } from "../../app/usecase/user/createUser";
import { UpdateUser } from "../../app/usecase/user/updateUser";
import { DeleteUser } from "../../app/usecase/user/deleteUser";
import { SearchByEmail } from "../../app/usecase/user/searchByEmail";
import { SearchByName } from "../../app/usecase/user/searchByName";
import { BCryptHashProviderServices } from "../../infra/services/BCryptHashProviderServices";

export class UserController {
    constructor() {}

//list all
    async listAll(request : Request, response : Response) {

        const drizzleUserRepository = new DrizzleUserRepository()
        const listAll = new ListAllUser(drizzleUserRepository)

        try {
                const listAllUsers = await listAll.execute()

                return response.json(listAllUsers)

        } catch (error) {
            
            return response.json({ error : "Erro ao listar usuários!"})
        }
    }

//create
    async create(request : Request, response : Response) {

        const { name, email, password, telephone, typeUser, districtId } = request.body

        if(!name || !email || !password || !districtId) {
            return response.json({ message : "Os campos nome, email, palavra-passe ou bairro não podem ser vazios!"})
        }

        const drizzleUserRepository = new DrizzleUserRepository()
        const hashProvider = new BCryptHashProviderServices()
        const createUser = new CreateUser(hashProvider, drizzleUserRepository)

        try {
            
            const user = await createUser.execute({
                name : name,
                email : email,
                password : password,
                telephone : telephone,
                typeUser : typeUser,
                districtId : districtId
            })

            return response.json(`Usuário ${user.name} criado com sucesso!`)

        } catch (error) {
            
            return response.json({ error : "Erro ao cadastrar usuário!"})
        }
    }

//update
    async update(request : Request, response : Response) {

        //const iduser = String(request.params.id)
        
        const iduser = request.user.id

        const { name, telephone, districtId } = request.body

        if(!name || !districtId) {
            
            return response.json({ message : "Dados inválidos!"})
        }

        const drizzleUserRepository = new DrizzleUserRepository()
        const updateUser = new UpdateUser(drizzleUserRepository)

        try {
                const user = await updateUser.execute(iduser, name, telephone, districtId)

                return response.json("Dados do usuário atualizados com sucesso!")

        } catch (error) {
            
            return response.json({ error : "Erro ao atualizar dados do usuário!"})
        }
    }

//delete
    async delete(request : Request, response : Response) {

        const iduser = String(request.params.id)

        const drizzleUserRepository = new DrizzleUserRepository()
        const deleteUser = new DeleteUser(drizzleUserRepository)

        try {
                await deleteUser.execute(iduser)

                return response.json({ message : "Usuário eliminado com sucesso!"})

        } catch (error) {
            
            return response.json({ error : "Erro ao eliminar usuário!"})
        }
    }

//search user by email
    async searchByEmail(request : Request, response : Response) {

        const email = String(request.params.email)

        const drizzleUserRepository = new DrizzleUserRepository()
        const searchByEmail = new SearchByEmail(drizzleUserRepository)

        try {
                const user = await searchByEmail.execute(email)

                return response.json(user)

        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar usuário por email!"})
        }
    }

//search user by name
    async searchByName(request : Request, response : Response) {

        const name = String(request.params.name)

        const drizzleUserRepository = new DrizzleUserRepository()
        const searchByName = new SearchByName(drizzleUserRepository)

        try {
                const user = await searchByName.execute(name)

                return response.json(user)

        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar usuário por nome!"})
        }
    }
}