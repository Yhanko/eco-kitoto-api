import { VolunteerParticipation } from "../../domain/entities/volunteerParticipation";
import { VolunteerParticipationRepository } from "../../domain/repositories/volunteerParticipationRepository";

export class SearchParticipationByVolunteerId {

    constructor(private volunteerParticipationRepository : VolunteerParticipationRepository) {}

    async execute(volunteerId : string) : Promise<VolunteerParticipation[] | null> {

        return await this.volunteerParticipationRepository.searchParticipationByVolunteerId(volunteerId)
    }
}