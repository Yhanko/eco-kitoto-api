import { CreateLogsDTO } from "../../../http/interfaces/logsDTO";
import { Logs } from "../../domain/entities/logs";
import { LogsRepository } from "../../domain/repositories/logsRepository";

export class CreateLogs {
    constructor(private logsRepository : LogsRepository) {}

    async execute(data : CreateLogsDTO) : Promise<Logs> {

        const newLog = new Logs (
            data.level,
            data.message,
            data.metadata
        )

        return await this.logsRepository.create(newLog)
    }
}