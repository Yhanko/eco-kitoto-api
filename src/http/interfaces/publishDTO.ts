import { typePublish } from "../../app/domain/entities/publish";

export interface CreatePublishDTO {
    user_id : string,
    type_publish : typePublish,
    comentary : string,
    volunteer_quantity? : number | undefined,
    trash_quantity? : number | undefined,
    reation? : number | undefined,
    image_url : string[],
    video_url? : string,
    location? : string
}