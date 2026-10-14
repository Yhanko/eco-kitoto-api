import { CreateComentaryDTO } from "../../../http/interfaces/comentaryDTO";
import { Comentary } from "../../domain/entities/comentary";
import { ComentaryRepository } from "../../domain/repositories/comentaryRepository";
import { PublishRepository } from "../../domain/repositories/publishRepository";
import { UserRepository } from "../../domain/repositories/userRepository";

export class CreateComentary {
    constructor(
        public userRepository : UserRepository,
        public publishRepository : PublishRepository,
        public comentaryRepository : ComentaryRepository
    ) {}

    async execute(data : CreateComentaryDTO) : Promise<Comentary> {

        const user = await this.userRepository.searchById(data.user_id)

        if(user?.length === 0 || !user) {
            throw new Error("Este usuário não existe!")
        }

        const publish = await this.publishRepository.findById(data.publish_id)
        
        if(publish?.length === 0 || !publish) {
            throw new Error("A publicação já não existe.")
        }

        const dataComentary = new Comentary(
            data.text_comentary,
            data.user_id,
            data.publish_id
        )

        return await this.comentaryRepository.create(dataComentary)
    }
}