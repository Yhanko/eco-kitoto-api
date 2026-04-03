import { RelatoryRepository } from "../../domain/repositories/relatoryRepository";

export class DeleteRelatory {
    constructor(private relatoryRepository : RelatoryRepository) {}

    async execute(idrelatory: string) : Promise<void> {

        return await this.relatoryRepository.delete(idrelatory)
    }
}