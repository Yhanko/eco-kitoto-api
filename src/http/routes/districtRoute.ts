import { Router } from "express";
import { DistrictController } from "../controllers/districtController";

const districtRouter = Router()
const districtController = new DistrictController()

//listAll
    districtRouter.get("/distrito", districtController.listAll)
//insert
    districtRouter.post("/distrito/novo", districtController.create)
//update
    districtRouter.patch("/distrito/editar/:id", districtController.update)
//delete
    districtRouter.delete("/distrito/:id", districtController.delete)
//search by name of district
    districtRouter.get("/distrito/:name", districtController.searchByName)

export { districtRouter }