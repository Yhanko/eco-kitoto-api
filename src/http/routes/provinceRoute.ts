import { Router } from "express";
import { ProvinceController } from "../controllers/provinceController";

const provinceRouter = Router()
const provinceController = new ProvinceController()

//list all
    provinceRouter.get("/provincia", provinceController.listAll)

//save
    provinceRouter.post("/provincia/nova", provinceController.create)

//update
    provinceRouter.patch("/provincia/editar/:id", provinceController.update)

//delete
    provinceRouter.delete("/provincia/:id", provinceController.delete)

//search province by name
    provinceRouter.get("/provincia/:name", provinceController.searchByName)

export { provinceRouter }