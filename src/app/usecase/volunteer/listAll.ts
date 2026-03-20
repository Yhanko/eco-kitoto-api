import { VolunteerParticipation } from "../../domain/entities/volunteerParticipation";
import { VolunteerParticipationRepository } from "../../domain/repositories/volunteerParticipationRepository";

export class ListAll {

    constructor(private volunteerParticipationRepository : VolunteerParticipationRepository) {}

    async execute() : Promise<VolunteerParticipation[] | null> {

        return await this.volunteerParticipationRepository.listAll()
    }
}