import { ComentaryRepository } from "../../domain/repositories/comentaryRepository";

export class RemoveReation {
    constructor(public comentaryRepository : ComentaryRepository) {}

    async execute(id_comentary: string, reation: number) : Promise<void> {
        return await this.comentaryRepository.removeReation(id_comentary, reation)
    }
}