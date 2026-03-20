import { MunicipalityRepository } from "../../domain/repositories/municipalityRepository";

export class SearchByName {
    constructor(private municipalityRepository : MunicipalityRepository) {}

    async execute(name : string) {

        return await this.municipalityRepository.searchByname(name)
    }
}