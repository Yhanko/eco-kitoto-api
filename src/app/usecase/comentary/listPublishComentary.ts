import { Comentary } from "../../domain/entities/comentary";
import { ComentaryRepository } from "../../domain/repositories/comentaryRepository";

export class ListPublishComentary {
    constructor(
        public comentaryRepository : ComentaryRepository
    ) {}

    async execute(publish_id : string) : Promise<Comentary[]> {
        return await this.comentaryRepository.listPublishComentary(publish_id)
    }
}