import { levelEnum } from "../../../infra/database/schema";

export type LevelEnum = (typeof levelEnum.enumValues)[number]

export class Logs {
    constructor(
        public level : LevelEnum,
        public message : string,
        public metadata : Record<string, any>,
        public id_logs? : string
    ) {}
}