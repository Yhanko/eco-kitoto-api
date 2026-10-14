import { ComentaryRepository } from "../../domain/repositories/comentaryRepository";

export class AddReation {
    constructor(public comentaryRepository : ComentaryRepository) {}

    async execute(id_comentary: string, reation: number) : Promise<void> {
        return await this.comentaryRepository.addReation(id_comentary, reation)
    }
}