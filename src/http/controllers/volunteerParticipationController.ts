import { Request, Response } from "express";
import { DrizzleVolunteerParticipationRepository } from "../../infra/repositories/drizzleVolunteerParticipationRepository";
import { ListAll } from "../../app/usecase/volunteer/listAll";
import { CreateVolunteerParticipation } from "../../app/usecase/volunteer/createVolunteerParticipation";
import { DrizzleUserRepository } from "../../infra/repositories/drizzleUserRepository";
import { DrizzleClearEventRepository } from "../../infra/repositories/drizzleClearEventRepository";
import { UpdateCurrentVolunteer } from "../../app/usecase/clearEvent/updateCurrentVolunteer";
import { GetMaxVolunteerById } from "../../app/usecase/clearEvent/getMaxVolunteerById";
import { GetCurrentVolunteerById } from "../../app/usecase/clearEvent/getCurrentVolunteerById";
import { DeleteVolunteerParticipation } from "../../app/usecase/volunteer/deleteVolunteerParticipation";
import { GetIdEventByParticipationId } from "../../app/usecase/volunteer/getIdEventByParticipationId";
import { RemoveCurrentVolunteer } from "../../app/usecase/clearEvent/removeCurrentVolunteer";
import { PontuationUpdate } from "../../app/usecase/volunteer/pontuationUpdate";
import { SearchParticipationById } from "../../app/usecase/volunteer/searchParticipationById";
import { SearchParticipationByVolunteer } from "../../app/usecase/volunteer/searchParticipationByVolunteer";

export class VolunteerParticipationController {

    constructor() {}

//list all
    async listAll(request : Request, response : Response) {

        const drizzleVolunteerParticipationRepository = new DrizzleVolunteerParticipationRepository()
        const listAll = new ListAll(drizzleVolunteerParticipationRepository)

        try {
                const volunteer = await listAll.execute()

                return response.json(volunteer)

        } catch (error) {
            console.error(error)
            return response.json({ error : "Erro ao listar Voluntários!"})
        }
    }

//create
    async create(request : Request, response : Response) {

        const idparticipation = crypto.randomUUID()
        const { eventId, volunteerId, pontuation, estatus } = request.body

        if(!eventId || !volunteerId) {

            return response.json({ message : "Pedido de participação inválido!"})
        }

        const drizzleUserRepository = new DrizzleUserRepository()
        const drizzleVolunteerParticipationRepository = new DrizzleVolunteerParticipationRepository()
        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        
        const maxVolunteers = new GetMaxVolunteerById(drizzleClearEventRepository)
        const currentVolunteer = new GetCurrentVolunteerById(drizzleClearEventRepository)
        const updateCurrentVolunteer = new UpdateCurrentVolunteer(drizzleClearEventRepository)

        const createVolunteer = new CreateVolunteerParticipation(
            drizzleUserRepository,
            drizzleVolunteerParticipationRepository
        )

        try {
               //verify if current volunter is equal max volunteer and block new user volunteer invite
               //get max volunteer necessary for this clear event
                let max_volunteer = await maxVolunteers.execute(eventId)
                
                //get current_volunteer number first
                let volunteers = await currentVolunteer.execute(eventId)

                if( volunteers < max_volunteer) {
                    
                    const volunteer = await createVolunteer.execute({
                            idparticipation,
                            eventId : eventId,
                            volunteerId : volunteerId,
                            pontuation : Number(pontuation),
                            estatus
                        })

                    await updateCurrentVolunteer.execute(eventId, volunteers)

                    return response.json(volunteer)
                    
                
                } else {  
                    console.log("Não há mais vagas para este Evento de Limpeza!")
                    
                    throw new Error("Não há mais vagas para este Evento de Limpeza!")
                }

        } catch (error) {
            
            return response.json({ error : "Erro ao enviar pedido de participação!"})
        }
    }

//pontuation update
    async pontuationUpdate(request : Request, response : Response) {

        const idparticipation = String(request.params.id)
        let { pontuation}  = request.body

        console.log("Pontuação: "+pontuation)

        if(!idparticipation) {
            return response.json({ message : "Evento não encontrado!"})
        }

        if(pontuation === 0) {
            return response.json({ message : "Pontuação inválida. Por favor, insira um valor superior a zero (0)!"})
        }

        const drizzleVolunteerParticipationRepository = new DrizzleVolunteerParticipationRepository()
        const pontuationUpdate = new PontuationUpdate(drizzleVolunteerParticipationRepository)

        try {
                await pontuationUpdate.execute(idparticipation, pontuation)

                return response.json({ message : "Pontuação do voluntário atualizada com sucesso!"})
                
        } catch (error) {
            console.log(error)
            return response.json({ error : "Erro ao atualizar a pontuação do voluntário!"})
        }
    }

//delete
    async delete(request : Request, response : Response) {

        const idparticipation = String(request.params.id)

        if(!idparticipation) {
            return response.json({ message : "Não foi encontrado nenhum evento onde participaste!"})
        }

        const drizzleVolunteerParticipationRepository = new DrizzleVolunteerParticipationRepository()
        const deleteVolunteerParticipation = new DeleteVolunteerParticipation(drizzleVolunteerParticipationRepository)
        const getIdEvent = new GetIdEventByParticipationId(drizzleVolunteerParticipationRepository)

        //clear event repository
        const drizzleClearEventRepository = new DrizzleClearEventRepository()
        const getCurrentVolunteer = new GetCurrentVolunteerById(drizzleClearEventRepository)
        const removeCurrentVolunteer = new RemoveCurrentVolunteer(drizzleClearEventRepository)

        try {
                /*
                    get id event clear in participation entitie to search current 
                    volunteer in clear event entitie 
                */
                const eventId = await getIdEvent.execute(idparticipation)
                let currentVolunteer = await getCurrentVolunteer.execute(eventId) //current volunteer

                //remove atual volunteer participation in clear event
                await removeCurrentVolunteer.execute(eventId, currentVolunteer)
                
                //delete volunteer participation
                await deleteVolunteerParticipation.execute(idparticipation)

                return response.json({ message : "Deixaste de participar do Evento de Limpeza!"})

        } catch (error) {
            return response.json({ error : "Erro ao eliminar participação em evento!"})
        }
    }

//search participation by id participation
    async searchParticipationById(request : Request, response : Response) {

        const idparticipation = String(request.params.id)

        if(!idparticipation) {
            return response.json({ message : "Não foi encontrado nenhum evento em que estejas a participar ou participaste!"})
        }

        const drizzleVolunteerParticipationRepository = new DrizzleVolunteerParticipationRepository()
        const searchById = new SearchParticipationById(drizzleVolunteerParticipationRepository)

        try {
                const participation = await searchById.execute(idparticipation)

                return response.json(participation)

        } catch (error) {
            return response.json({ error : "Erro ao pesquisar evento onde participaste ou estejas participando!"})
        }
    }

//search participation by volunteer name
    async searchByVolunteer(request : Request, response : Response) {

        const { volunteer } = request.body

        if(!volunteer) {
            return response.json({ message : "Voluntário não encontrado!"})
        }

        const drizzleVolunteerParticipationRepository = new DrizzleVolunteerParticipationRepository()
        const searchParticipation = new SearchParticipationByVolunteer(drizzleVolunteerParticipationRepository)

        try {
            const participation = await searchParticipation.execute(volunteer)

            return response.json(participation)
            
        } catch (error) {
            return response.json({ error : "Erro ao pesquisar Evento onde participaste ou estejas participando!"})
        }
    }
}