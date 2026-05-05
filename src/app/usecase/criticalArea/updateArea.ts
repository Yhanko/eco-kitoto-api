import { levelEnum, statusEnum } from "../../../http/interfaces/criticalAreaDTO";
import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";

export class UpdateArea {

    constructor(private criticalAreaRepository : CriticalAreaRepository) {}

    async execute(idcriticalArea: string, districtId: string, descrition: string,
            coordenaties: string, critical_level: levelEnum, image: string, estatus: statusEnum) {
        
            return await this.criticalAreaRepository.update(
                idcriticalArea,
                districtId,
                descrition,
                coordenaties,
                critical_level,
                image,
                estatus)
        }
}