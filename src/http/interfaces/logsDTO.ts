import { LevelEnum } from "../../app/domain/entities/logs";

export interface CreateLogsDTO {
    level : LevelEnum,
    message : string,
    metadata : Record<string, any>
}