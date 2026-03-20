import { District } from "../../domain/entities/district";
import { DistrictRepository } from "../../domain/repositories/districtRepository";

export class UpdateDistrict {
    constructor(private districtRepository : DistrictRepository) {}

    async execute(id_district : string, name : string, municipalityId : string) {

        return await this.districtRepository.update(id_district, name, municipalityId)
    }
}