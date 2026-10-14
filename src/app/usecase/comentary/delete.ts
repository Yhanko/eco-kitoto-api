import { ComentaryRepository } from "../../domain/repositories/comentaryRepository";

export class DeleteComentary {
    constructor(public comentaryRepository : ComentaryRepository) {}

    async execute(id_comentary : string) : Promise<void> {
        return await this.comentaryRepository.delete(id_comentary)
    }
}