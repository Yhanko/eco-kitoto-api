import { DistrictRepository } from "../../domain/repositories/districtRepository";

export class SearchByDistrictName {
    constructor(private districtRepository : DistrictRepository) {}

    async execute(name : string) {

        return await this.districtRepository.searchByName(name)
    }
}