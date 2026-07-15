import { criticalLevelEnum, criticalStatusEnum } from "../../../infra/database/schema";

export type Critical_Level = (typeof criticalLevelEnum.enumValues)[number]
export type Critical_Estatus = (typeof criticalStatusEnum.enumValues)[number]

export class CriticalArea {
    
    constructor(
        public districtId : string,
        public descrition : string,
        public coordenaties : string,
        public critical_level : Critical_Level,
        public image_1 : string,
        public estatus : Critical_Estatus,
        public image_2? : string,
        public image_3? : string,
        public idcriticalArea? : string
    ) {}
}