import { Router } from "express";
import { MunicipalityController } from "../controllers/municipalityController";

const municipalityRouter = Router()
const municipalityController = new MunicipalityController()

//list all
    municipalityRouter.get("/municipio", municipalityController.listAll)
//create
    municipalityRouter.post("/municipio/novo", municipalityController.create)
//update
    municipalityRouter.patch("/municipio/editar/:id", municipalityController.update)
//delete
    municipalityRouter.delete("/municipio/:id", municipalityController.delete)
//search by name of municipality
    municipalityRouter.get("/municipio/:name", municipalityController.searchByName)

export { municipalityRouter }