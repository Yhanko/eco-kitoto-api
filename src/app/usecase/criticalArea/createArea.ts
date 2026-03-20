import { CreateCriticalAreaDTO } from "../../../http/interfaces/criticalAreaDTO";
import { CriticalArea } from "../../domain/entities/criticalArea";
import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";

export class CreateArea {

    constructor(private criticalAreaRepository : CriticalAreaRepository) {}

    async execute(data : CreateCriticalAreaDTO) : Promise<CriticalArea> {

        //verify if already exist a critical area with the same geographyc coordenaties
        const existingCriticalArea = await this.criticalAreaRepository.searchCriticalAreaByCoordenaties(data.coordenaties)

        if(existingCriticalArea?.length) {
            
            console.log(existingCriticalArea[0]?.coordenaties)
            throw new Error("Já existe uma Área Crítica com essas coordenadas!")
        }

        const area = new CriticalArea(
            data.idcriticalArea,
            data.districtId,
            data.descrition,
            data.coordenaties,
            data.critical_level,
            data.image,
            data.estatus
        )

        return await this.criticalAreaRepository.create(area)
    }
}