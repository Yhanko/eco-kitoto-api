import { MunicipalityRepository } from "../../domain/repositories/municipalityRepository";

export class DeleteMunicipality {
    constructor(private municipalityRepository : MunicipalityRepository) {}

    async execute(idmunicipality : string) {

        return await this.municipalityRepository.delete(idmunicipality)
    }
}