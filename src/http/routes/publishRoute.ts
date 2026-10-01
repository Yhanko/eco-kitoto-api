import { Router } from "express";
import { PublishController } from "../controllers/publishController";

const publishRouter = Router()
const publishController = new PublishController()

//========= PUBLISH ROUTES =========
//list all publish
publishRouter.get("/publicacao/todas", publishController.listAllPublish)
//list all my publish
publishRouter.get("/publicacao/minhas/:id", publishController.allMyPublish)
//list all publish reation
publishRouter.get("/publicacao/reacao/:id", publishController.publishReation)
//create publish
publishRouter.post("/publicacao/nova", publishController.create)
//update publish
publishRouter.patch("/publicacao/minha/editar/:id", publishController.updatePublish)
//add reation on publish
publishRouter.patch("/publicacao/adicionar/reacao/:id", publishController.addReation)
//remove reation on publish
publishRouter.patch("/publicacao/remover/reacao/:id", publishController.removeReation)
//delete publish
publishRouter.delete("publicacao/eliminar/:id", publishController.delete)

export { publishRouter }