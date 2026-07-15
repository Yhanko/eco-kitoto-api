import { Router } from "express";
import { EmailController } from "../controllers/emailController";

const emailRouter = Router()
const emailController = new EmailController()

// view all emails
    //emailRouter.get("/todos-emails")
//send email
    emailRouter.post("/enviar-email", emailController.send)

export { emailRouter }