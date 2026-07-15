import { Router } from "express";
import { CriticalAreaController } from "../controllers/criticalAreaController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";
import { upload } from "../../utils/multer";

const criticalAreaRouter = Router()
const criticalAreaController = new CriticalAreaController()

//list all  
    criticalAreaRouter.get("/area-critica", authenticatedMiddleware, criticalAreaController.listAll)
//create
    criticalAreaRouter.post("/area-critica/nova", authenticatedMiddleware, upload.fields([
        { name : "image_1", maxCount : 1 },
        { name : "image_2", maxCount : 1 },
        { name : "image_3", maxCount : 1 }
    ]), criticalAreaController.create)
//update
    criticalAreaRouter.patch("/area-critica/editar/:id", authenticatedMiddleware, upload.single("image"), criticalAreaController.update)
//delete
    criticalAreaRouter.delete("/area-critica/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), criticalAreaController.delete)
//search by id
    criticalAreaRouter.get("/area-critica/:id", authenticatedMiddleware, criticalAreaController.searchAreaById)
//search by critical level
    criticalAreaRouter.get("/area-critica/nivel/:criticidade", authenticatedMiddleware, criticalAreaController.searchByCriticalLevel)
//search by status
    criticalAreaRouter.get("/area-critica/status/:status", authenticatedMiddleware, criticalAreaController.searchByStatus)
//search by coordenaties
    criticalAreaRouter.get("/area-critica/coordenadas/:coordenadas", authenticatedMiddleware, criticalAreaController.searchByCoordenaties)
//search by locality
    criticalAreaRouter.get("/area-critica/bairro/:localidade", authenticatedMiddleware, criticalAreaController.searchByLocality)

export { criticalAreaRouter }