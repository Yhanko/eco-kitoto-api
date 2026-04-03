import { Relatory } from "../../domain/entities/relatory";
import { RelatoryRepository } from "../../domain/repositories/relatoryRepository";

export class SearchrelatoryBySendDate {
    constructor(private relatoryRepository : RelatoryRepository) {}

    async execute(sendDate : Date) : Promise<Relatory[] | null> {

        return await this.relatoryRepository.searchRelatoryBySendDate(sendDate)
    }
}