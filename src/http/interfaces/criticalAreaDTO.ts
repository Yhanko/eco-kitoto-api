import { criticalLevelEnum, criticalStatusEnum } from "../../infra/database/schema"

export type levelEnum = (typeof criticalLevelEnum.enumValues)[number]
export type statusEnum = (typeof criticalStatusEnum.enumValues)[number]

export interface CreateCriticalAreaDTO {
    districtId : string,
    descrition : string,
    coordenaties : string,
    critical_level : levelEnum,
    image_1 : string,
    estatus : statusEnum,
    image_2? : string,
    image_3? : string
}