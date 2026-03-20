import { Province } from "../../domain/entities/province";
import { ProvinceRepository } from "../../domain/repositories/provinceRepository";

export class ListAllProvince {

    constructor(private provinceRepository : ProvinceRepository) {}

    async execute() : Promise<Province[]>{

        return await this.provinceRepository.listAll()
    }
}