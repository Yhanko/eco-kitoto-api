import { Request, Response } from "express";
import { DrizzleLogsRepository } from "../../infra/repositories/drizzleLogsRepository";
import { ListAll } from "../../app/usecase/logs/listAll";

export class LogsController {
    constructor() {}

//list all
    async listAll(request : Request, response : Response) {
        
        const drizzleLogsRepository = new DrizzleLogsRepository()
        const listAll = new ListAll(drizzleLogsRepository)

        try {
                const logs = await listAll.execute()

                response.status(200).json(logs)
        } catch (error) {
            response.status(400).json({ message : "Erro ao listar logs"})
        }
    }
}