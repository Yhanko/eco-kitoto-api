import { CreateDistrictDTO } from "../../../http/interfaces/districtDTO";
import { District } from "../../domain/entities/district";
import { DistrictRepository } from "../../domain/repositories/districtRepository";

export class CreateDistrict {
    constructor(private districtRepository : DistrictRepository) {}

    async execute(data : CreateDistrictDTO) : Promise<District> {

        //verify if district is already exist
        const existingDistrict = await this.districtRepository.searchByName(data.name)

        if(!existingDistrict) {
            throw new Error("O distrito já existe!")
        }
        
        const district = new District(
            data.id_district,
            data.name,
            data.municipalityId
        )

        await this.districtRepository.create(district)

        return district
    }
}