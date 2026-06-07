import { Logs } from "../entities/logs";

export interface LogsRepository {
    listAll() : Promise<Logs[]>
    create(log : Logs) : Promise<Logs>
}