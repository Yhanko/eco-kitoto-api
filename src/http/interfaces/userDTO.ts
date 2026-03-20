import { typeUserEnum } from "../../infra/database/schema"

export type TypeUser = (typeof typeUserEnum.enumValues)[number]

export interface UserResponseDTO {
    iduser : string,
    name : string,
    email : string,
    telephone : string,
    typeUser : TypeUser,
    districtId : string,
    createdAt : string | Date
}

export interface CreateUserDTO {
    iduser : string,
    name : string,
    email : string,
    password : string,
    telephone : string,
    typeUser : TypeUser,
    districtId : string
}