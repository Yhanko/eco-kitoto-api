import { CreateCriticalAreaDTO } from "../../../http/interfaces/criticalAreaDTO";
import { CriticalArea } from "../../domain/entities/criticalArea";
import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";
import { LogsRepository } from "../../domain/repositories/logsRepository";

export class CreateArea {

    constructor(
        private criticalAreaRepository : CriticalAreaRepository,
        private logsRepository : LogsRepository
    ) {}

    async execute(data : CreateCriticalAreaDTO) : Promise<CriticalArea> {

        //verify if already exist a critical area with the same geographyc coordenaties
        const existingCriticalArea = await this.criticalAreaRepository.searchCriticalAreaByCoordenaties(data.coordenaties)

        if(existingCriticalArea?.length) {
            throw new Error("Já existe uma Área Crítica com essas coordenadas!")
        }

        const area = new CriticalArea(
            data.districtId,
            data.descrition,
            data.coordenaties,
            data.critical_level,
            data.image_1,
            data.estatus,
            data.image_2,
            data.image_3
        )

        //caso corra tudo bem, salva o log de sucesso
        await this.logsRepository.create({
            level : "INFO",
            message : "Área Crítica criada com sucesso",
            metadata : {
                ID_do_distrito : data.districtId,
                Nivel_de_criticidade : data.critical_level
            }
        })

        return await this.criticalAreaRepository.create(area)
    }
}