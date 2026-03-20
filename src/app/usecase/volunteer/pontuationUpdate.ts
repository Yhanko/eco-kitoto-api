import { VolunteerParticipationRepository } from "../../domain/repositories/volunteerParticipationRepository";

export class PontuationUpdate {

    constructor(private volunteerParticipationRepository : VolunteerParticipationRepository) {}

    async execute(idparticipation : string, pontuation : number) : Promise<void> {

        return await this.volunteerParticipationRepository.pontuationUpdate(idparticipation, pontuation)
    } 
}