import { VolunteerParticipation } from "../entities/volunteerParticipation";

export interface VolunteerParticipationRepository {
    create(volunteerParticipaton : VolunteerParticipation) : Promise<VolunteerParticipation>
    pontuationUpdate(idparticipation: string, pontuation: number) : Promise<void>
    delete(idparticipation: string) : Promise<void>
    listAll() : Promise<VolunteerParticipation[] | null>
    getIdEventByParticipationId(idparticipation: string) : Promise<string>
    searchParticipationById(idparticipation: string) : Promise<VolunteerParticipation[] | null>
    searchParticipationByVolunteerId(volunteerId: string) : Promise<VolunteerParticipation[] | null>
}