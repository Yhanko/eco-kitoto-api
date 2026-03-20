import { Router } from "express";
import { ClearEventController } from "../controllers/clearEventController";

const clearEventRouter = Router()
const clearEventController = new ClearEventController()

//list all clear event
    clearEventRouter.get("/evento-limpeza", clearEventController.listAllEvent)
//create
    clearEventRouter.post("/evento-limpeza/novo", clearEventController.create)
//update
    clearEventRouter.patch("/evento-limpeza/editar/:id", clearEventController.update)
//delete
    clearEventRouter.delete("/evento-limpeza/:id", clearEventController.delete)
//search by id
    clearEventRouter.get("/evento-limpeza/:id", clearEventController.searchById)
//search by responsible of clear event
    clearEventRouter.get("/evento-limpeza/responsavel/:usuario", clearEventController.searchByResponsibleUser)
//search by locality/street
    clearEventRouter.get("/evento-limpeza/bairro/:bairro", clearEventController.searchByLocality)
//search by time
    clearEventRouter.get("/evento-limpeza/horas/:horas", clearEventController.searchByTime)
//search by status
    clearEventRouter.get("/evento-limpeza/status/:status", clearEventController.searchByStatus)
//search by date
    //clearEventRouter.get("/evento-limpeza/data/:data", clearEventController.searchByDate)

export { clearEventRouter }