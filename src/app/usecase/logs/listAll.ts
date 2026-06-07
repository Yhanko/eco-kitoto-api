import { Logs } from "../../domain/entities/logs";
import { LogsRepository } from "../../domain/repositories/logsRepository";

export class ListAll {
    constructor(private logsRepository : LogsRepository) {}

    async execute() : Promise<Logs[]> {
        return await this.logsRepository.listAll()
    }
}