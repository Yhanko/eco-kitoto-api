import { CreateMaterialDTO } from "../../../http/interfaces/materialDTO";
import { Material } from "../../domain/entities/material";
import { MaterialRepository } from "../../domain/repositories/material";

export class CreateMaterial {
    constructor(private materialRepository : MaterialRepository) {}

    async execute(data : CreateMaterialDTO) : Promise<Material> {

        const material = new Material(
            data.eventId,
            data.name
        )

        await this.materialRepository.create(material)

        return material
    }
}