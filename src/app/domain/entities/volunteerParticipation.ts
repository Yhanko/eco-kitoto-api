import { statusEnum } from "../../../http/interfaces/volunteerParticipationDTO";

export class VolunteerParticipation {

    constructor(
        public idparticipation : string,
        public eventId : string,
        public volunteerId : string,
        public pontuation : number,
        public estatus : statusEnum
    ) {}
}