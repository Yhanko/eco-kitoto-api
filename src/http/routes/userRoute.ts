import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const userRouter = Router()
const userController = new UserController()

// DOC USERS
/**
 * @openapi
 * /eco-kitoto/usuarios:
 *   get:
 *     summary: Listar todos os utilizadores
 *     description: Retorna a lista de utilizadores com os dados de localização aplanados.
 *     tags:
 *       - USERS
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de utilizadores retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   iduser:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                   name:
 *                     type: string
 *                     example: "João Silva"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "joao.silva@ecokitoto.com"
 *                   telephone:
 *                     type: string
 *                     example: "+244923000000"
 *                   typeUser:
 *                     type: string
 *                     example: "Cidadão"
 *                   province:
 *                     type: string
 *                     example: "Cuanza Norte"
 *                   municipality:
 *                     type: string
 *                     example: "Cazengo"
 *                   districtId:
 *                     type: string
 *                     example: "3b7d-41b9-9189-e82200c01401"
 *                   district:
 *                     type: string
 *                     example: "Bairro Popular"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-08-10T12:00:00.000Z"
 *       401:
 *         description: Não autorizado (Token inválido ou sem permissão).
 *
 * /eco-kitoto/usuarios/novo:
 *   post:
 *     summary: Criar um novo usuário
 *     tags:
 *       - USERS
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - districtId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao.silva@ecokitoto.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Senha@123"
 *               telephone:
 *                 type: string
 *                 example: "+244923000000"
 *               typeUser:
 *                 type: string
 *                 example: "Cidadão"
 *               districtId:
 *                 type: string
 *                 example: "3b7d-41b9-9189-e82200c01401"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Usuário João Silva criado com sucesso!"
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autorizado (Token inválido ou sem permissão).
 *
 * /eco-kitoto/usuarios/editar/{id}:
 *   patch:
 *     summary: Atualizar dados de um usuário
 *     tags:
 *       - USERS
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - districtId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva Atualizado"
 *               telephone:
 *                 type: string
 *                 example: "+244923000000"
 *               districtId:
 *                 type: string
 *                 example: "3b7d-41b9-9189-e82200c01401"
 *     responses:
 *       200:
 *         description: Dados atualizados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Dados do usuário atualizados com sucesso!"
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autorizado (Token inválido ou sem permissão).
 *
 * /eco-kitoto/usuarios/{id}:
 *   delete:
 *     summary: Eliminar um usuário
 *     tags:
 *       - USERS
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário a eliminar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     responses:
 *       200:
 *         description: Usuário eliminado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário eliminado com sucesso!"
 *       400:
 *         description: Erro ao eliminar usuário.
 *       401:
 *         description: Não autorizado (Token inválido ou sem permissão).
 *
 * /eco-kitoto/usuarios/{email}:
 *   get:
 *     summary: Pesquisar usuário por e-mail
 *     tags:
 *       - USERS
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: E-mail do usuário
 *         schema:
 *           type: string
 *           format: email
 *         example: "joao.silva@ecokitoto.com"
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 iduser:
 *                   type: string
 *                   example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 email:
 *                   type: string
 *                   example: "joao.silva@ecokitoto.com"
 *                 telephone:
 *                   type: string
 *                   example: "+244923000000"
 *                 typeUser:
 *                   type: string
 *                   example: "Cidadão"
 *                 province:
 *                   type: string
 *                   example: "Cuanza Norte"
 *                 municipality:
 *                   type: string
 *                   example: "Cazengo"
 *                 districtId:
 *                   type: string
 *                   example: "3b7d-41b9-9189-e82200c01401"
 *                 district:
 *                   type: string
 *                   example: "Bairro Popular"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-08-10T12:00:00.000Z"
 *       401:
 *         description: Não autorizado (Token inválido ou sem permissão).
 *       404:
 *         description: Usuário não encontrado.
 */

//======== USERS ROUTES ========
//list all users
userRouter.get("/usuarios", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), userController.listAll)
//create
userRouter.post("/usuarios/novo", userController.create)
//update
    userRouter.patch("/usuarios/editar/:id", authenticatedMiddleware, userController.update)
//delete
    userRouter.delete("/usuarios/:id", authenticatedMiddleware, userController.delete)
//search by email
    userRouter.get("/usuarios/:email", authenticatedMiddleware, userController.searchByEmail)

export { userRouter }