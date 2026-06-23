import { eq, or } from "drizzle-orm";
import { User } from "../../app/domain/entities/user";
import { UserRepository } from "../../app/domain/repositories/userRepository";
import { db } from "../database/db";
import { districtTable, municipalityTable, provinceTable, userTable } from "../database/schema";
import { CreateUserDTO, UserResponseDTO } from "../../http/interfaces/userDTO";

export class DrizzleUserRepository implements UserRepository {

    constructor() {}

//list all
    async listAll(): Promise<UserResponseDTO[] | null> {
        
        const listAll = await db.select({
            iduser : userTable.iduser,
            name : userTable.name,
            email : userTable.email,
            telephone : userTable.telephone,
            typeUser : userTable.typeUser,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            districtId : userTable.districtId,
            district : districtTable.name,
            createdAt : userTable.createdAt
        })
        .from(userTable)
        .innerJoin(districtTable, eq(userTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .orderBy(userTable.name)

        return listAll.map(p => ({
            iduser : p.iduser ?? "",
            name : p.name ?? "",
            email : p.email ?? "",
            telephone : p.telephone ?? "",
            typeUser : p.typeUser ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            districtId : p.districtId ?? "",
            district : p.district ?? "",
            createdAt : p.createdAt!
        }))
    }

//insert
    async create(data : CreateUserDTO): Promise<User> {
        
        const [user] = await db.insert(userTable).values({
            name : data.name,
            email : data.email,
            password : data.password,
            telephone : data.telephone,
            typeUser : data.typeUser,
            districtId : data.districtId
        }).returning()

        return {
            iduser : user?.iduser ?? "",
            name : user?.name ?? "",
            email : user?.email ?? "",
            password : user?.password ?? "",
            telephone : user?.telephone ?? "",
            typeUser : user?.typeUser as any,
            districtId : user?.districtId ?? ""
        }
    }

//update
    async update(iduser: string, name: string, telephone: string, districtId: string): Promise<User> {
        
        const [user] = await db.update(userTable)
        .set({
            name : name,
            telephone : telephone,
            districtId : districtId
        }).where(eq(userTable.iduser, iduser)).returning()

        return {
            iduser : user?.iduser ?? "",
            name : user?.name ?? "",
            email : user?.email ?? "",
            password : user?.password ?? "",
            telephone : user?.telephone ?? "",
            typeUser : user?.typeUser as any,
            districtId : user?.districtId ?? ""
        }
    }

//delete
    async delete(iduser: string): Promise<void> {  
        await db.delete(userTable).where(eq(userTable.iduser, iduser))
    }

//search by id
    async searchById(iduser: string): Promise<UserResponseDTO[] | null> {
        
        const users = await db.select({
            iduser : userTable.iduser,
            name : userTable.name,
            email : userTable.email,
            telephone : userTable.telephone,
            typeUser : userTable.typeUser,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            districtId : userTable.districtId,
            district : districtTable.name,
            createdAt : userTable.createdAt
        })
        .from(userTable)
        .innerJoin(districtTable, eq(userTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .where(eq(userTable.iduser, iduser))

        return users.map(p => ({
            iduser : p.iduser ?? "",
            name : p.name ?? "",
            email : p.email ?? "",
            telephone : p.telephone ?? "",
            typeUser : p.typeUser ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            districtId : p.districtId ?? "",
            district : p.district ?? "",
            createdAt : p.createdAt!
        }))
    }

//search by email
    async searchByEmail(email: string): Promise<UserResponseDTO[] | null> {
        
        const users = await db.select({
            iduser : userTable.iduser,
            name : userTable.name,
            email : userTable.email,
            telephone : userTable.telephone,
            typeUser : userTable.typeUser,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            districtId : userTable.districtId,
            district : districtTable.name,
            createdAt : userTable.createdAt
        })
        .from(userTable)
        .innerJoin(districtTable, eq(userTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .where(eq(userTable.email, email))

        return users.map(p => ({
            iduser : p.iduser ?? "",
            name : p.name ?? "",
            email : p.email ?? "",
            telephone : p.telephone ?? "",
            typeUser : p.typeUser ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            districtId : p.districtId ?? "",
            district : p.district ?? "",
            createdAt : p.createdAt!
        }))
    }

//search by name
    async searchByName(email: string): Promise<UserResponseDTO[] | null> {
        
        const users = await db.select({
            iduser : userTable.iduser,
            name : userTable.name,
            email : userTable.email,
            telephone : userTable.telephone,
            typeUser : userTable.typeUser,
            province : provinceTable.name,
            municipality : municipalityTable.name,
            districtId : userTable.districtId,
            district : districtTable.name,
            createdAt : userTable.createdAt
        })
        .from(userTable)
        .innerJoin(districtTable, eq(userTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .where(eq(userTable.email, email))

        return users.map(p => ({
            iduser : p.iduser ?? "",
            name : p.name ?? "",
            email : p.email ?? "",
            telephone : p.telephone ?? "",
            typeUser : p.typeUser ?? "",
            province : p.province ?? "",
            municipality : p.municipality ?? "",
            districtId : p.districtId ?? "",
            district : p.district ?? "",
            createdAt : p.createdAt!
        }))
    }

//find by email
    async findByEmail(email: string): Promise<User[] | null> {
        
        const users = await db.select({
            iduser : userTable.iduser,
            name : userTable.name,
            email : userTable.email,
            password : userTable.password,
            telephone : userTable.telephone,
            typeUser : userTable.typeUser,
            districtId : userTable.districtId
        })
        .from(userTable)
        .innerJoin(districtTable, eq(userTable.districtId, districtTable.id_district))
        .innerJoin(municipalityTable, eq(districtTable.municipalityId, municipalityTable.idmunicipality))
        .innerJoin(provinceTable, eq(municipalityTable.provinceId, provinceTable.idprovince))
        .where(eq(userTable.email, email))

        return users.map(p => ({
            iduser : p.iduser ?? "",
            name : p.name ?? "",
            email : p.email ?? "",
            password : p.password ?? "",
            telephone : p.telephone ?? "",
            typeUser : p.typeUser as any,
            districtId : p.districtId ?? ""
        }))
    }
}