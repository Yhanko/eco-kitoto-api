import { ProvinceRepository } from "../../domain/repositories/provinceRepository";

export class UpdateProvince {
    
    constructor(private provinceRepository : ProvinceRepository) {}

    async execute(idprovince : string, name : string) {

        return await this.provinceRepository.update(idprovince, name)
    }
}