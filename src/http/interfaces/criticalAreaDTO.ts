import { criticalLevelEnum, criticalStatusEnum } from "../../infra/database/schema"

export type levelEnum = (typeof criticalLevelEnum.enumValues)[number]
export type statusEnum = (typeof criticalStatusEnum.enumValues)[number]

export interface CreateCriticalAreaDTO {
    idcriticalArea : string,
    districtId : string,
    descrition : string,
    coordenaties : string,
    critical_level : levelEnum,
    image : string,
    estatus : statusEnum
}