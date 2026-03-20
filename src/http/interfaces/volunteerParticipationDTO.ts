import { participationStatusEnum } from "../../infra/database/schema";

export type statusEnum = (typeof participationStatusEnum.enumValues)[number]

export interface CreateVolunteerParticipationDTO {
    idparticipation : string,
    eventId : string,
    volunteerId : string,
    pontuation : number,
    estatus : statusEnum
}