import { ClearEventRepository } from "../../domain/repositories/clearEventRepository";
import { LogsRepository } from "../../domain/repositories/logsRepository";

export class DeleteClearEvent {

    constructor(
        private clearEventRepository : ClearEventRepository,
        private logsRepository : LogsRepository
    ) {}

    async execute(idEvent : string) : Promise<void> {

        const clearEvent = await this.clearEventRepository.searchClearEnventById(idEvent)

        if(clearEvent?.length !== null || clearEvent.length !== "") {
            
        }


        //log que registra a eliminacao de um evento de limpeza
        await this.logsRepository.create({
            level : "INFO",
            message : "Evento de Limpeza eliminado com sucesso.",
            metadata : {
                Evento_de_limpeza_eliminado : clearEvent?.[0]?.title
            }            
        })

        return await this.clearEventRepository.delete(idEvent)
    }
}