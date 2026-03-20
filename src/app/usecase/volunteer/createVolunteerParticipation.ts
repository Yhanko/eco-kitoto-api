import { CreateVolunteerParticipationDTO } from "../../../http/interfaces/volunteerParticipationDTO";
import { VolunteerParticipation } from "../../domain/entities/volunteerParticipation";
import { VolunteerParticipationRepository } from "../../domain/repositories/volunteerParticipationRepository";
import { UserRepository } from "../../domain/repositories/userRepository";

enum typeUserEnum {
    administrador = "Administrador",
    administradora = "Administradora",
    voluntario = "Voluntário",
    voluntaria = "Voluntária",
    cidadao = "Cidadão"
}

export class CreateVolunteerParticipation {

    constructor(
        private userRepository : UserRepository,
        private volunteerParticipationRepository : VolunteerParticipationRepository,
    ) {}

    async execute(data : CreateVolunteerParticipationDTO) : Promise<VolunteerParticipation> {

        
        //verify if user already existing
        const existingUser = await this.userRepository.searchById(data.volunteerId)

        if(!existingUser) {
            console.log("Usuário não encontrado!")
            throw new Error("Usuário não encontrado!")
        }

        //verify if type user of existingUser is a Voluntário or Voluntária
        if(![typeUserEnum.voluntario, typeUserEnum.voluntaria].includes(existingUser[0]?.typeUser as any)) {
            console.log("Só é permitido a inscrição de voluntários em um Evento de Limpeza!")
            throw new Error("Só é permitido a inscrição de voluntários em um Evento de Limpeza!")
        }

        const volunteerParticipation = new VolunteerParticipation(
            data.idparticipation,
            data.eventId,
            data.volunteerId,
            data.pontuation,
            data.estatus
        )
        
        return await this.volunteerParticipationRepository.create(volunteerParticipation)
    }
}