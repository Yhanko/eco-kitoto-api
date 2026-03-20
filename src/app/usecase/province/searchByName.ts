import { ProvinceRepository } from "../../domain/repositories/provinceRepository";

export class SearchByProvince {

    constructor(private provinceRepository : ProvinceRepository) {}

    async execute(name : string) {

        return await this.provinceRepository.searchByProvince(name)
    }
}