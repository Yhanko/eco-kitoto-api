import { Router } from "express";
import { ComentaryController } from "../controllers/comentaryController";

const comentaryRouter = Router()
const comentaryController = new ComentaryController()

//publish comentary
    comentaryRouter.get("/comentarios/todos", comentaryController.listPublishComentary)
//comentary reation
    comentaryRouter.get("/comentarios/reacoes/:id", comentaryController.listComentaryReation)
//create
    comentaryRouter.post("/comentarios/novo", comentaryController.create)
//update
    comentaryRouter.patch("/comentarios/editar/:id", comentaryController.update)
//add reation
    comentaryRouter.patch("/comentarios/adicionar/:id", comentaryController.addReation)
//remove reation
    comentaryRouter.patch("/comentarios/remover/:id", comentaryController.removeReation)
//delete
    comentaryRouter.delete("/comentarios/eliminar/:id", comentaryController.delete)

export { comentaryRouter }