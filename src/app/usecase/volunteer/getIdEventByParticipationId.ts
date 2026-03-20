import { VolunteerParticipationRepository } from "../../domain/repositories/volunteerParticipationRepository";

export class GetIdEventByParticipationId {

    constructor(private volunteerParticipationRepository : VolunteerParticipationRepository) {}

    async execute(idparticipation : string) : Promise<string> {

        return await this.volunteerParticipationRepository.getIdEventByParticipationId(idparticipation)
    }
}