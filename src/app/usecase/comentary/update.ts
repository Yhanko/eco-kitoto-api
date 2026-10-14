import { Comentary } from "../../domain/entities/comentary";
import { ComentaryRepository } from "../../domain/repositories/comentaryRepository";

export class Update {
    constructor(public comentaryRepository : ComentaryRepository) {}

    async execute(id_comentary: string, text_comentary: string) : Promise<Comentary> {

        const comentary = await this.comentaryRepository.findById(id_comentary)

        if(comentary?.length === 0 || !comentary) {
            throw new Error("Essa publicação já não se encontra disponível.")
        }

        return await this.comentaryRepository.update(
            id_comentary,
            text_comentary
        )
    }
}