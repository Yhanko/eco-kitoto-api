import { Municipality } from "../entities/municipality";

export interface MunicipalityRepository {
    create(municipality : Municipality) : Promise<Municipality>
    update(idmunicipality : string, name : string, provinceId : string) : Promise<Municipality>
    delete(idmunicipality : string) : Promise<void>
    listAll() : Promise<Municipality[]>
    searchByname(name : string) : Promise<Municipality[] | null>
}