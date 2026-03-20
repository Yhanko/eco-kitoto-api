import { District } from "../../domain/entities/district";
import { DistrictRepository } from "../../domain/repositories/districtRepository";

export class ListAllDistrict {
    constructor(private districtRepository : DistrictRepository) {}

    async execute() : Promise<District[] | null> {

        return await this.districtRepository.listAll()
    }
}