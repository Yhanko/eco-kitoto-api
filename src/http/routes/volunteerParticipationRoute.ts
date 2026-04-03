import { Router } from "express";
import { VolunteerParticipationController } from "../controllers/volunteerParticipationController";

const volunteerRouter = Router()
const volunteerController = new VolunteerParticipationController()

//list all
    volunteerRouter.get("/voluntarios", volunteerController.listAll)
//create
    volunteerRouter.post("/voluntarios/novo", volunteerController.create)
//delete
    volunteerRouter.delete("/voluntarios/:id", volunteerController.delete)
//pontuationUpdate
    volunteerRouter.patch("/voluntarios/:id", volunteerController.pontuationUpdate)
//search participation by id participation
    volunteerRouter.get("/voluntarios/:id", volunteerController.searchParticipationById)
//search participation by volunteer id
    volunteerRouter.get("/voluntarios/voluntario/:id", volunteerController.searchByVolunteerId)

export { volunteerRouter }