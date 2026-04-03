import { Router } from "express";
import { RelatoryController } from "../controllers/relatoryController";

const relatoryRouter = Router()
const relatoryController = new RelatoryController

//list all
    relatoryRouter.get("/relatorios", relatoryController.listAll)
//create
    relatoryRouter.post("/relatorios/novo", relatoryController.create)
//update
    relatoryRouter.patch("/relatorios/editar", relatoryController.update)
//search by id
    relatoryRouter.get("/relatorios/:id", relatoryController.searchRelatoryById)
//search by event id
    relatoryRouter.get("/relatorios/evento/:event", relatoryController.searchRelatoryByEventId)
//search by send date
    relatoryRouter.get("/relatorios/data-envio/:date", relatoryController.searchRelatoryBySendDate)

export { relatoryRouter }