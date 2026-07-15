import { Request, Response } from "express";
import { MailTrapEmailService } from "../../infra/services/MailTrapEmailService";
import { SendEmail } from "../../app/usecase/sendEmail/sendEmail";

export class EmailController {
    constructor() {}

    async send(request : Request, response : Response) {
        const { fromEmail, toEmail, subject, text } = request.body

        const mailTrapEmailService = new MailTrapEmailService()
        const sendEmail = new SendEmail(mailTrapEmailService)

        if(!fromEmail || !toEmail || !subject || !text) {
            return response.json({ message : "Todos os campos devem ser preenchidos!"})
        }

        try {
                const email = await sendEmail.execute(fromEmail, toEmail, subject, text)

                return response.status(201).json(email)
        } catch (error) {
            
        }
    }
}