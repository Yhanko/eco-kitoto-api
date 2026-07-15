import { EmailServiceRepository } from "../../domain/repositories/emailServiceRepository";

export class SendEmail {
    constructor(private emailServiceRepository : EmailServiceRepository) {}

    async execute(fromEmail: string, toEmail: string, subject: string, text: string) {
        return await this.emailServiceRepository.send({
            from : fromEmail,
            to : toEmail,
            subject : subject,
            text : text
        })
    }
}