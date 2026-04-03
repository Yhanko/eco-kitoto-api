import { Request, Response } from "express";
import { DrizzleRelatoryRepository } from "../../infra/repositories/drizzleRelatoryRepository";
import { ListAll } from "../../app/usecase/relatory/listAll";
import { CreateRelatory } from "../../app/usecase/relatory/createRelatory";
import { UpdateRelatory } from "../../app/usecase/relatory/updateRelatory";
import { DeleteRelatory } from "../../app/usecase/relatory/deleteRelatory";
import { SearchRelatoryById } from "../../app/usecase/relatory/searchRelatoryById";
import { SearchRelatoryByEventId } from "../../app/usecase/relatory/searchRelatoryByEventId";
import { SearchrelatoryBySendDate } from "../../app/usecase/relatory/searchRelatoryBySendDate";
import { parse } from "date-fns"

export class RelatoryController {
    constructor() {}

//list all
    async listAll(request : Request, response : Response) {

        const drizzleRelatoryRepository = new DrizzleRelatoryRepository()
        const listAll = new ListAll(drizzleRelatoryRepository)

        try {
            const listAllRelatory = await listAll.execute()

            return response.json(listAllRelatory)

        } catch (error) {
            return response.json({ error : "Erro ao listar relatórios!"})
        }
    }

//create
    async create(request : Request, response : Response) {

        const id = crypto.randomUUID()

        const { eventId, before_image, after_image, observation } = request.body

        if(!eventId || !before_image || !after_image) {
            return response.json({ message : "Preencha os campos obrigatórios!"})
        }

        const drizzleRelatoryRepository = new DrizzleRelatoryRepository()
        const createRelatory = new CreateRelatory(drizzleRelatoryRepository)

        try {
                const relatory = await createRelatory.execute({
                    idrelatory : id,
                    eventId : eventId,
                    before_image : before_image,
                    after_image : after_image,
                    observation : observation
                })

                return response.json(relatory)

        } catch (error) {
            console.log(error)
            return response.json({ error : "Erro ao salvar relatório!"})
        }
    }

//update
    async update(request : Request, response : Response) {

        const idrelatory = String(request.params.id)
        const { eventId, before_image, after_image, observation } = request.body

        if(!idrelatory) {
            return response.json({ message : "Relatório não encontrado!"})
        }

        if(!eventId || !before_image || !after_image) {
            return response.json({ message : "Preencha os campos obrigatórios!"})
        }

        const drizzleRelatoryRepository = new DrizzleRelatoryRepository()
        const updateRelatory = new UpdateRelatory(drizzleRelatoryRepository)

        try {
                const update = await updateRelatory.execute(
                    idrelatory,
                    eventId,
                    before_image,
                    after_image, 
                    observation
                )

                return response.json(update)

        } catch (error) {
            return response.json({ error : "Erro ao atualizar relatório!"})
        }
    }

//delete
    async delete(request : Request, response : Response) {

        const idrelatory = String(request.params.id)

        if(!idrelatory) {
            return response.json({ message : "Relatório não encontrado ou não existe!"})
        }

        const drizzleRelatoryRepository = new DrizzleRelatoryRepository()
        const deleteRelatory = new DeleteRelatory(drizzleRelatoryRepository)

        try {
                await deleteRelatory.execute(idrelatory)

                return response.json({ message : "Relatório eliminado com sucesso!"})

        } catch (error) {
            return response.json({ error : "Erro ao eliminar o relatório!"})
        }
    }

//search by relatory id
    async searchRelatoryById(request : Request, response : Response) {

        const idrelatory = String(request.params.id)

        if(!idrelatory) {
            return response.json({ message : "Relatório não encontrado!"})
        }

        const drizzleRelatoryRepository = new DrizzleRelatoryRepository()
        const searchById = new SearchRelatoryById(drizzleRelatoryRepository)

        try {
                const relatory = await searchById.execute(idrelatory)

                return response.json(relatory)

        } catch (error) {
            return response.json({ error : "Erro ao pesquisar relatório pelo ID!"})
        }
    }

//search by event id
    async searchRelatoryByEventId(request : Request, response : Response) {

        const eventId = String(request.params.event)

        if(!eventId) {
            return response.json({ message : "Relatório não encontrado!"})
        }

        const drizzleRelatoryRepository = new DrizzleRelatoryRepository()
        const searchByEventId = new SearchRelatoryByEventId(drizzleRelatoryRepository)

        try {
                const relatory = await searchByEventId.execute(eventId)

                return response.json(relatory)
                
        } catch (error) {
            return response.json({ error : "Erro ao pesquisar relatório pelo ID!"})
        }
    }

//search by send date
    async searchRelatoryBySendDate(request : Request, response : Response) {

        //formatando data
        const sendDate = String(request.params.date)
        const dateObject = new Date(sendDate) //caso nao resultar, multiplicar o sendDate por 1000

        //extraindo as partes para formatar em yyy/mm/dd
        const year = dateObject.getFullYear()
        const month = String(dateObject.getMonth() + 1).padStart(2, '0') //os meses começam no índice 0
        const day = String(dateObject.getDay()).padStart(2, '0')
        const date : string = `${year}-${month}-${day}`
        const dateFormated = parse(date, 'yyy/MM/dd', new Date())

        if(!sendDate) {
            return response.json({ message : "Relatório não encontrado!"})
        }

        const drizzleRelatoryRepository = new DrizzleRelatoryRepository()
        const searchById = new SearchrelatoryBySendDate(drizzleRelatoryRepository)

        try {
                const relatory = await searchById.execute(dateFormated)

                return response.json(relatory)
                
        } catch (error) {
            return response.json({ error : "Erro ao pesquisar relatório pela data!"})
        }
    }
}