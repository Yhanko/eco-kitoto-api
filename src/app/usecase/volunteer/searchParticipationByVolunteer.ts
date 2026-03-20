import { VolunteerParticipation } from "../../domain/entities/volunteerParticipation";
import { VolunteerParticipationRepository } from "../../domain/repositories/volunteerParticipationRepository";

export class SearchParticipationByVolunteer {

    constructor(private volunteerParticipationRepository : VolunteerParticipationRepository) {}

    async execute(volunteerName : string) : Promise<VolunteerParticipation[] | null> {

        return await this.volunteerParticipationRepository.searchParticipationByVolunteer(volunteerName)
    }
}