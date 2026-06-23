import { participationStatusEnum } from "../../infra/database/schema";

export type statusEnum = (typeof participationStatusEnum.enumValues)[number]

export interface CreateVolunteerParticipationDTO {
    eventId : string,
    volunteerId : string,
    pontuation : number,
    estatus : statusEnum
}