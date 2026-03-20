import { levelEnum, statusEnum } from "../../../http/interfaces/criticalAreaDTO";
import { CriticalArea } from "../entities/criticalArea";

export interface CriticalAreaRepository {
    create(criticalArea : CriticalArea) : Promise<CriticalArea>
    update(idcriticalArea: string, districtId : string, descrition: string,
            coordenaties: string, critical_level: levelEnum,image: string,
            estatus: statusEnum) : Promise<CriticalArea>
    delete(idcriticalArea: string) : Promise<void>
    listAll() : Promise<CriticalArea[] | null>
    searchCriticalAreaById(idcriticalArea: string) : Promise<CriticalArea[] | null>
    searchCriticalAreaByCoordenaties(coordenaties: string) : Promise<CriticalArea[] | null>
    searchCriticalAreaByLevel(critical_level: levelEnum) : Promise<CriticalArea[] | null>
    searchCriticalAreaByStatus(estatus: statusEnum) : Promise<CriticalArea[] | null>
    searchCriticalAreaByLocality(locality : string) : Promise<CriticalArea[] | null>
}