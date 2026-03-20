import { VolunteerParticipation } from "../../domain/entities/volunteerParticipation";
import { VolunteerParticipationRepository } from "../../domain/repositories/volunteerParticipationRepository";

export class SearchParticipationById {

    constructor(private volunteerParticipationRepository : VolunteerParticipationRepository) {}

    async execute(idparticipation : string) : Promise<VolunteerParticipation[] | null> {

        return await this.volunteerParticipationRepository.searchParticipationById(idparticipation)
    }
}