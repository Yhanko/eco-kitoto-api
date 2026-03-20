import { Province } from "../entities/province";

export interface ProvinceRepository {
    create(province : Province) : Promise<Province>
    update(idprovince : string, name : string) : Promise<Province>
    delete(idprovince : string) : Promise<void>
    listAll() : Promise<Province[]>
    searchByProvince(name : string) : Promise<Province[] | null>
}