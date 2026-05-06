import { levelEnum, statusEnum } from "../../../http/interfaces/criticalAreaDTO";
import CloudinaryServices from "../../../infra/services/storage/cloudinary/CloudinaryServices";
import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";

export class UpdateArea {

    constructor(private criticalAreaRepository : CriticalAreaRepository) {}

    async execute(idcriticalArea: string, districtId: string, descrition: string,
            coordenaties: string, critical_level: levelEnum, image: string, estatus: statusEnum) {
        
                //verify if area critica already exist
                const existingArea = await this.criticalAreaRepository.searchCriticalAreaById(idcriticalArea)

                if(!existingArea) {
                        throw new Error("Área Crítica não existe!")
                }

                //remove the last image before save
                if(existingArea[0]?.image) {
                        // publicId = último segmento da URL (ou conforme você armazena no banco)
                        const publicId = existingArea[0]?.image.split("/").pop()?.split(".")[0]
                        if(publicId) {
                                await CloudinaryServices.destroy(`services/${publicId}`)
                        }
                }

                return await this.criticalAreaRepository.update(
                        idcriticalArea,
                        districtId,
                        descrition,
                        coordenaties,
                        critical_level,
                        image,
                        estatus
                )
        }
}