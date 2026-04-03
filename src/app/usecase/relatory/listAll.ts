import { Relatory } from "../../domain/entities/relatory";
import { RelatoryRepository } from "../../domain/repositories/relatoryRepository";

export class ListAll {
    constructor(private relatoryRepository : RelatoryRepository) {}

    async execute() : Promise<Relatory[] | null> {

        return await this.relatoryRepository.listAll()
    }
}