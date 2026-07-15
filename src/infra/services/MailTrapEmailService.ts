import { EmailServiceRepository } from "../../app/domain/repositories/emailServiceRepository";
import { mailTransport } from "../config/mail";

export class MailTrapEmailService implements EmailServiceRepository {
    constructor() {}

    async send(paramns: { from: string; to: string; subject: string; text: string; html?: string; }): Promise<void> {
        
        console.log("config: ", process.env.MAILTRAP_HOST)
        await mailTransport.sendMail({
            from : paramns.from,
            to : paramns.to,
            subject : paramns.subject,
            text : paramns.text, 
        })
    }
}