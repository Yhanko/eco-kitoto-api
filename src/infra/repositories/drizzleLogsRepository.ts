import { desc } from "drizzle-orm";
import { Logs } from "../../app/domain/entities/logs";
import { LogsRepository } from "../../app/domain/repositories/logsRepository";
import { db } from "../database/db";
import { logsTable } from "../database/schema";
import { CreateLogsDTO } from "../../http/interfaces/logsDTO";

export class DrizzleLogsRepository implements LogsRepository {
    constructor() {}

//list all
    async listAll(): Promise<Logs[]> {
        
        const listAll = await db.select({
            id_log : logsTable.id_log,
            level : logsTable.level,
            message : logsTable.message,
            metadata : logsTable.metadata
        })
        .from(logsTable)
        .orderBy(desc(logsTable.createdAt))

        return listAll.map(p => ({
            id_logs : p.id_log ?? "",
            level : p.level ?? "",
            message : p.message ?? "",
            metadata : p.metadata ?? ""
        }))
    }

//create
    async create(data : CreateLogsDTO): Promise<Logs> {
        
        const [log] = await db.insert(logsTable).values({
            level : data.level,
            message : data.message,
            metadata : data.metadata
        }).returning()

        return {
            level : log?.level!,
            message : log?.message ?? "",
            metadata : log?.metadata ?? ""
        }
    }
}