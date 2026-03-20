import { Municipality } from "../../domain/entities/municipality";
import { MunicipalityRepository } from "../../domain/repositories/municipalityRepository";

export class ListAll {

    constructor(private municipalityRepository : MunicipalityRepository) {}

    async execute() : Promise<Municipality[]> {

        return await this.municipalityRepository.listAll()
    }
}