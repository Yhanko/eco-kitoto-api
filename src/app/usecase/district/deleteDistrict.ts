import { DistrictRepository } from "../../domain/repositories/districtRepository";

export class DeleteDistrict {
    constructor(private districtRepository : DistrictRepository) {}

    async execute(id_district : string) : Promise<void> {

        return await this.districtRepository.delete(id_district)
    }
}