import { Municipality } from "../../domain/entities/municipality";
import { MunicipalityRepository } from "../../domain/repositories/municipalityRepository";

export class UpdateMunicipality {
    constructor(private municipalityRepository : MunicipalityRepository) {}

    async execute(idmunicipality: string, name: string, provinceId: string) {
        
        return await this.municipalityRepository.update(idmunicipality, name, provinceId) 
    }
}