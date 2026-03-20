import { Router } from "express";
import { UserController } from "../controllers/userController";

const userRouter = Router()
const userController = new UserController()

//list all
    userRouter.get("/usuarios", userController.listAll)
//create
    userRouter.post("/usuarios/novo", userController.create)
//update
    userRouter.patch("/usuarios/editar/:id", userController.update)
//delete
    userRouter.delete("/usuarios/:id", userController.delete)
//search by email
    userRouter.get("/usuarios/:email", userController.searchByEmail)

export { userRouter }