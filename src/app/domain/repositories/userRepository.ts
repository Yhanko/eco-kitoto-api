import { UserResponseDTO } from "../../../http/interfaces/userDTO";
import { User } from "../entities/user";

export interface UserRepository {
    create(user : User) : Promise<User>
    update(iduser: string, name: string, telephone: string, districtId: string) : Promise<User>
    delete(iduser : string) : Promise<void>
    listAll() : Promise<UserResponseDTO[] | null>
    searchById(iduser : string) : Promise<UserResponseDTO[] | null>
    searchByEmail(email : string) : Promise<UserResponseDTO[] | null>
    searchByName(name : string) : Promise<UserResponseDTO[] | null>
}