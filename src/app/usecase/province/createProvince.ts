import { CreateProvinceDTO } from "../../../http/interfaces/provinceDTO";
import { Province } from "../../domain/entities/province";
import { ProvinceRepository } from "../../domain/repositories/provinceRepository";

export class CreateProvince {

    constructor(private provinceRepository : ProvinceRepository) {}

    async execute(data : CreateProvinceDTO) {

        //verify if province is already exist
        const existingProvince = await this.provinceRepository.searchByProvince(data.name)

        if(existingProvince?.length) {
            throw new Error("A província já existe!")
        }

        const province = new Province(
            data.idprovince,
            data.name
        )

        await this.provinceRepository.create(province)

        return province
    }
}