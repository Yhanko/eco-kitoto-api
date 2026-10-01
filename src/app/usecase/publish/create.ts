import { CreatePublishDTO } from "../../../http/interfaces/publishDTO";
import { Publish } from "../../domain/entities/publish";
import { PublishRepository } from "../../domain/repositories/publishRepository";
import { UserRepository } from "../../domain/repositories/userRepository";

export class Create {
    constructor(
        private userRepository : UserRepository,
        private publishRepository : PublishRepository
    ) {}

    async execute(data : CreatePublishDTO) : Promise<Publish> {

        const user = await this.userRepository.searchById(data.user_id)

        if(!user || user.length === 0) {
            throw new Error("Usuário não encontrado!")
        }

        const dataPublish = new Publish(
            data.user_id,
            data.type_publish,
            data.comentary,
            data.volunteer_quantity,
            data.trash_quantity,
            data.reation,
            data.image_url,
            data.video_url,
            data.location
        )

        return await this.publishRepository.create(dataPublish)
    }
}