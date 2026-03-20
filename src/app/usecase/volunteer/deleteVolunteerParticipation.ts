import { VolunteerParticipationRepository } from "../../domain/repositories/volunteerParticipationRepository";

export class DeleteVolunteerParticipation {

    constructor(private volunteerParticipationRepository : VolunteerParticipationRepository) {}

    async execute(idparticipation : string) : Promise<void> {

        return await this.volunteerParticipationRepository.delete(idparticipation)
    }
}