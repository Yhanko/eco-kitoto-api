import { Request, Response } from "express";
import { DrizzleClearEventRepository } from "../../infra/repositories/drizzleClearEventRepository";
import { ListAllEvent } from "../../app/usecase/clearEvent/listAll";
import { CreateClearEvent } from "../../app/usecase/clearEvent/createClearEvent";
import { UpdateClearEvent } from "../../app/usecase/clearEvent/updateClearEvent";
import { DeleteClearEvent } from "../../app/usecase/clearEvent/deleteClearEvent";
import { SearchClearEventById } from "../../app/usecase/clearEvent/searchClearEnventById";
import { SearchClearEventByResponsibleUser } from "../../app/usecase/clearEvent/searchClearEventByResponsible";
import { SearchClearEventByLocality } from "../../app/usecase/clearEvent/searchClearEventByLocality";
import { SearchClearEventByTime } from "../../app/usecase/clearEvent/searchClearEventByTime";
import { statusEnum } from "../interfaces/clearEventDTO";
import { SearchClearEventByStatus } from "../../app/usecase/clearEvent/searchClearEventByStatus";
import { UpdateCurrentVolunteer } from "../../app/usecase/clearEvent/updateCurrentVolunteer";
import { SearchClearEventByDate } from "../../app/usecase/clearEvent/searchClearEventByDate";
import { parse, format } from "date-fns"
import { DrizzleLogsRepository } from "../../infra/repositories/drizzleLogsRepository";
import { CreateLogs } from "../../app/usecase/logs/createLogs";

export class ClearEventController {

    constructor() {}

//list all
    async listAllEvent(request : Request, response : Response) {

        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const listAllEvent = new ListAllEvent(drizzleClearEventRepository)

        try {
                const event = await listAllEvent.execute()

                return response.json(event)

        } catch (error) {
            
            return response.json({ error : "Erro ao listar Eventos de Limpeza!"})
        }
    }

//create
    async create(request : Request, response : Response) {

        const current_volunteer = 0

        const { title, areaId, eventDate, eventTime, descrition, max_volunteer,
            meeting_point, estatus } = request.body
        
        const responsibleId = request.user.id //id gerado através do token 
        
        if(!title || !areaId || !eventDate || !eventTime
            || !descrition || !meeting_point) {

            return response.json({ message : "Campos inválidos!"})
        }

        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const drizzleLogsRepository = new DrizzleLogsRepository()
        const createEvent = new CreateClearEvent(
            drizzleClearEventRepository,
            drizzleLogsRepository
        )

        try {
                const event = await createEvent.execute({
                    title : title,
                    areaId : areaId,
                    responsibleId : responsibleId,
                    eventDate : eventDate,
                    eventTime : eventTime,
                    descrition : descrition,
                    max_volunteer : max_volunteer,
                    current_volunteer : current_volunteer,
                    meeting_point : meeting_point,
                    estatus : estatus
                })

                return response.json(event)

        } catch (error : any) {
            
            //log para capturar o erro a nivel da infraestrutura
            const createLog = new CreateLogs(drizzleLogsRepository)

            await createLog.execute({
                level : "ERROR",
                message : "Erro crítico na rota de cadastro de Evento de Limpeza",
                metadata : {
                    stack_trace : error.stack,
                    ip : request.ip,
                    path: request.originalUrl
                }
            })

            return response.json({ error : "Erro ao cadastrar Evento de Limpeza!"})
        }
    }

//update
    async update(request : Request, response : Response) {

        const idEvent = String(request.params.id)
        const { title, areaId, eventDate, eventTime, descrition,
            max_volunteer, meeting_point, estatus } = request.body

        const responsibleId = request.user.id

        if(!idEvent) {

            return response.json({ message : "Evento de Limpeza não encontrado!"})
        }

        if(!title || !areaId || !eventDate || !eventTime || !descrition
            || !meeting_point
        ) {
            return response.json({ message : "Campos inválidos!"})
        }

        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const updateClearEvent = new UpdateClearEvent(drizzleClearEventRepository)

        try {
                const event = updateClearEvent.update(
                    idEvent,
                    title,
                    areaId,
                    responsibleId,
                    eventDate,
                    eventTime,
                    descrition,
                    max_volunteer,
                    meeting_point,
                    estatus)

                return response.json(event)

        } catch (error) {
            
            return response.json({ error : "Erro ao alterar dados do Evento de Limpeza!"})
        }
    }

//update current volunteer
    async updateCurrentVolunteer(request : Request, response : Response) {

        const idEvent = String(request.params.id)
        const [ current_volunteer ] = request.body

        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const updateCurrentVolunteer = new UpdateCurrentVolunteer(drizzleClearEventRepository)

        try {
                await updateCurrentVolunteer.execute(idEvent, current_volunteer)

                return response.json({ message : "Número de voluntários atualizados!"})
                
        } catch (error) {
            return response.json({ error : "Erro ao atualizar número de voluntários participantes!"})
        }
    }

//delete
    async delete(request : Request, response : Response) {

        const idEvent = String(request.params.id)

        if(!idEvent) {

            return response.json({ message : "Evento de Limpeza não encontrado!"})
        }

        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const drizzleLogsRepository = new DrizzleLogsRepository()
        const deleteClearEvent = new DeleteClearEvent(
            drizzleClearEventRepository,
            drizzleLogsRepository
        )
        const logs = new CreateLogs(drizzleLogsRepository)

        try {
                //log que regista a eliminação de um evento de limpeza
                await logs.execute({
                    level : "INFO",
                    message : "Evento de Limpeza eliminado com sucesso",
                    metadata : {
                        Usuario_que_eliminou_o_evento : request.user.id,
                        Perfil : request.user.typeUser
                    }
                })

                await deleteClearEvent.execute(idEvent)

                return response.json({ message : "Evento de Limpeza eliminado com sucesso!"})

        } catch (error : any) {

            //log que regista a eliminação de um evento de limpeza
            await logs.execute({
                level : "ERROR",
                message : "Erro crítico na rota que elimina o evento de limpeza",
                metadata : {
                    Usuario_que_tentou_eliminar_o_evento : request.user.id,
                    Perfil : request.user.typeUser,
                    stack_trace : error.stack,
                    ip : request.ip,
                    path : request.originalUrl
                }
            })

            return response.json({ error : "Erro ao eliminar Evento de Limpeza!"})
        }
    }

//search by id
    async searchById(request : Request, response : Response) {

        const idEvent = String(request.params.id)

        if(!idEvent) {

            return response.json({ message : "Evento de Limpeza não encontrado!"})
        }

        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const searchById = new SearchClearEventById(drizzleClearEventRepository)

        try {
                const event = await searchById.execute(idEvent)

                return response.json(event)

        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar Evento de Limpeza pelo ID!"})
        }
    }

//search by responsible user name
    async searchByResponsibleUser(request : Request, response : Response) {

        const userName = String(request.params.usuario)

        if(!userName) {

            return response.json({ message : "Este usuário não está relacionado com nenhum evento de Limpeza!"})
        }

        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const searchByResponsibleUser = new SearchClearEventByResponsibleUser(drizzleClearEventRepository)

        try {
                const event =  await searchByResponsibleUser.execute(userName)

                return response.json(event)

        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar os Eventos de Limpeza relacionado com este usuário!"})
        }
    }

//search by clear event locality
    async searchByLocality(request : Request, response : Response) {

        const locality = String(request.params.bairro)

        if(!locality) {

            return response.json({ message : "Evento de Limpeza não encontrado!"})
        }

        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const searchByLocality = new SearchClearEventByLocality(drizzleClearEventRepository)

        try {
                const event = await searchByLocality.execute(locality)

                return response.json(event)

        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar Evento de Limpeza pelo bairro!"})
        }
    }

//search by time
    async searchByTime(request : Request, response : Response) {

        const eventTime = String(request.params.horas)

        if(!eventTime) {

            return response.json({ message : "Eventos de Limpeza não encontrados!"})
        }

        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const searchByTime = new SearchClearEventByTime(drizzleClearEventRepository)

        try {
                const event = await searchByTime.execute(eventTime)

                return response.json(event)

        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar Eventos de Limpeza pelas horas!"})
        }
    }

//search by status
    async searchByStatus(request : Request, response : Response) {

        const estatus = String(request.params.status) as statusEnum

        if(!estatus) {

            return response.json({ message : "Eventos de Limpeza não encontrado!"})
        }

        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const searchByStatus = new SearchClearEventByStatus(drizzleClearEventRepository)

        try {
                const event = await searchByStatus.execute(estatus)

                return response.json(event)

        } catch (error) {
            
            return response.json({ error : "Erro ao pesquisar Eventos de Limpeza pelo status!"})
        }
    }

//search by date 
    async searchByDate(request : Request, response : Response) {

        const eventDate = String(request.params.data).replace(/-/g, '\/')
        const dateObject = new Date(eventDate)

        const year = dateObject.getFullYear()
        const month = String(dateObject.getMonth() + 1).padStart(2, '0')
        const day = String(dateObject.getDate()).padStart(2, '0')
        const date : string = `${year}-${month}-${day}`
        const dateFormated = parse(date, 'yyyy-MM-dd', new Date())
        const finalDate = format(dateFormated, 'yyyy-MM-dd')
        
        console.log("data: "+dateFormated)

        if(!eventDate) {

            return response.json({ message : "Evento de Limpeza não encontrado!"})
        }

        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const searchByDate = new SearchClearEventByDate(drizzleClearEventRepository)

        try {
                const event = await searchByDate.execute(dateFormated)
        } catch (error) {
           // console.error(error)
            return response.json({ error : "Erro ao pesquisar Eventos de Limpeza pela data!"})
        }
    } 
}