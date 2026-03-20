import { ProvinceRepository } from "../../domain/repositories/provinceRepository";

export class DeleteProvince {

    constructor(private provinceRepository : ProvinceRepository) {}

    async execute(idprovince : string) {

        return await this.provinceRepository.delete(idprovince)
    }
}