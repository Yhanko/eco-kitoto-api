import { District } from "../entities/district";

export interface DistrictRepository {
    create(district : District) : Promise<District>
    update(id_district: string, name: string, municipalityId: string): Promise<District>
    delete(id_district: string) : Promise<void>
    listAll() : Promise<District[]>
    searchByName(name : string) : Promise<District[] | null>
}