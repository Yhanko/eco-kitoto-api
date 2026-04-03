import { Relatory } from "../../domain/entities/relatory";
import { RelatoryRepository } from "../../domain/repositories/relatoryRepository";

export class SearchRelatoryById {
    constructor(private relatoryRepository : RelatoryRepository) {}

    async execute(idrelatory: string) : Promise<Relatory[] | null> {

        return await this.relatoryRepository.searchRelatoryById(idrelatory)
    }
}