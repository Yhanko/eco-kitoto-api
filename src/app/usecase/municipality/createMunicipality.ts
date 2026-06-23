import { CreateMunicipalityDTO } from "../../../http/interfaces/municipalityDTO";
import { Municipality } from "../../domain/entities/municipality";
import { MunicipalityRepository } from "../../domain/repositories/municipalityRepository";

export class CreateMunicipality {
    constructor(private municipalityRepository : MunicipalityRepository) {}

    async execute(data : CreateMunicipalityDTO) {

        //verify if municipality is already exist
        const existingMunicipality = await this.municipalityRepository.searchByname(data.name)

        if(existingMunicipality?.length) {
            throw new Error("O município já existe!")
        }

        const municipality = new Municipality(
            data.name,
            data.provinceId
        )

        await this.municipalityRepository.create(municipality)

        return municipality
    }
}