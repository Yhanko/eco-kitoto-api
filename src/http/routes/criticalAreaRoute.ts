import { Router } from "express";
import { CriticalAreaController } from "../controllers/criticalAreaController";

const criticalAreaRouter = Router()
const criticalAreaController = new CriticalAreaController()

//list all
    criticalAreaRouter.get("/area-critica", criticalAreaController.listAll)
//create route
    criticalAreaRouter.post("/area-critica/nova", criticalAreaController.create)
//update
    criticalAreaRouter.patch("/area-critica/editar/:id", criticalAreaController.update)
//delete
    criticalAreaRouter.delete("/area-critica/:id", criticalAreaController.delete)
//search by id
    criticalAreaRouter.get("/area-critica/:id", criticalAreaController.searchAreaById)
//search by critical level
    criticalAreaRouter.get("/area-critica/nivel/:criticidade", criticalAreaController.searchByCriticalLevel)
//search by status
    criticalAreaRouter.get("/area-critica/status/:status", criticalAreaController.searchByStatus)
//search by coordenaties
    criticalAreaRouter.get("/area-critica/coordenadas/:coordenadas", criticalAreaController.searchByCoordenaties)
//search by locality
    criticalAreaRouter.get("/area-critica/bairro/:localidade", criticalAreaController.searchByLocality)

export { criticalAreaRouter }