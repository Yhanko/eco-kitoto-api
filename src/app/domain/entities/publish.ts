import { typePublishEnum } from "../../../infra/database/schema";

export type typePublish = (typeof typePublishEnum.enumValues)[number]

export class Publish {
    constructor(
        public user_id : string,
        public type_publish : typePublish,
        public comentary : string,
        public volunteer_quantity? : number,
        public trash_quantity? : number,
        public reation? : number,
        public image_url? : string[],
        public video_url? : string,
        public location? : string,
        public id_publish? : string
    ) {}
}