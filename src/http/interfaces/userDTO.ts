import { typeUserEnum } from "../../infra/database/schema"

export type TypeUser = (typeof typeUserEnum.enumValues)[number]

export interface UserResponseDTO {
    iduser : string,
    name : string,
    email : string,
    telephone : string,
    typeUser : TypeUser,
    districtId : string,
    createdAt : Date
}

export interface CreateUserDTO {
    name : string,
    email : string,
    password : string,
    telephone : string,
    typeUser : TypeUser,
    districtId : string
}

export interface AuthUserDTO {
    email : string,
    password : string
}