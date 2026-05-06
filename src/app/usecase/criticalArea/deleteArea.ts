import CloudinaryServices from "../../../infra/services/storage/cloudinary/CloudinaryServices";
import { CriticalAreaRepository } from "../../domain/repositories/criticalAreaRepository";

export class DeleteArea {

    constructor(private criticalAreaRepository : CriticalAreaRepository) {}

    async execute(idcriticalArea : string) : Promise<void> {

        //verify if area critica already exist
        const existingArea = await this.criticalAreaRepository.searchCriticalAreaById(idcriticalArea)

        if(!existingArea) {
            throw new Error("Área Crítica não existe!")
        }

        //if exist image on cloudinary, destroy it
        if(existingArea[0]?.image) {

            const parts = existingArea[0]?.image.split("/")
            const fileNameWithExt = parts[parts.length - 1]
            const folder = parts[parts.length - 2]
            const publicId = `${folder}/${fileNameWithExt?.split(".")[0]}`

            await CloudinaryServices.destroy(publicId)
        }

        return await this.criticalAreaRepository.delete(idcriticalArea)
    }
}