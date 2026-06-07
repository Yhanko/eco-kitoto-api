import { Router } from "express";
import { LogsController } from "../controllers/logsController";

const logsRouter = Router()
const logsController = new LogsController()

//list all
    logsRouter.get("/logs", logsController.listAll)

export { logsRouter }