import { ComentaryRepository } from "../../domain/repositories/comentaryRepository";

export class ListComentaryReation {
    constructor(public comentaryRepository : ComentaryRepository) {}

    async execute(id_comentary : string) : Promise<number> {
        return await this.comentaryRepository.listComentaryReation(id_comentary)
    }
}