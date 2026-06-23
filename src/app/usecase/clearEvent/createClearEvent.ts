import { CreateClearEventDTO } from "../../../http/interfaces/clearEventDTO";
import { ClearEvent } from "../../domain/entities/clearEvent";
import { Logs } from "../../domain/entities/logs";
import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";
import { LogsRepository } from "../../domain/repositories/logsRepository";

export class CreateClearEvent {

    constructor(
        private clearEventRepository : ClearEventRepository,
        private logsRepository : LogsRepository
    ) {}

    async execute(data : CreateClearEventDTO) : Promise<ClearEvent> {

        /*
            verify if exist a clear event with the same user responsible and 
            the same date event and the same time event
        */
       const existingEvent = await this.clearEventRepository.searchClearEventByResponsibleAndDateAndTime(
        data.responsibleId, data.eventDate, data.eventTime
       )

       if(existingEvent?.length !== null || existingEvent.length !== "") {

        //regista o log da tentativa de criar um evento na mesma hora e data pelo mesmo responsavel
            await this.logsRepository.create({
                level : "WARN",
                message : "Tentativa de criar dois eventos na mesma data e hora pelo mesmo responsável!",
                metadata : {
                    Id_do_responsavel : data.responsibleId,
                    Id_do_evento_existente : existingEvent?.[0]?.idEvent,
                    Titulo_do_evento_existente : existingEvent?.[0]?.title,
                    Titulo_do_novo_Evento : data.title
                }
            })

            throw new Error("Não pode criar dois ou mais eventos na mesma data e hora!")
       }
               
        const event = new ClearEvent(
            data.title,
            data.areaId,
            data.responsibleId,
            data.eventDate,
            data.eventTime,
            data.descrition,
            data.max_volunteer,
            data.current_volunteer,
            data.meeting_point,
            data.estatus
        )

        //caso corra tudo bem, salva o log de sucesso
        await this.logsRepository.create({
            level : "INFO",
            message : "Evento de Limpeza criado com sucesso",
            metadata : {
                Id_do_responsavel : data.responsibleId,
                Titulo_do_evento : data.title,
                Data_do_evento : data.eventDate,
                Hora_do_evento : data.eventTime
            }
        })

        return await this.clearEventRepository.create(event)
    }
}