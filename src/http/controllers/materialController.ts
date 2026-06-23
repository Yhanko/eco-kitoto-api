import { Request, Response } from "express";
import { DrizzleMaterialRepository } from "../../infra/repositories/drizzleMaterialRepository";
import { ListAll } from "../../app/usecase/material/listAll";
import { CreateMaterial } from "../../app/usecase/material/createMaterial";
import { UpdateMaterial } from "../../app/usecase/material/updateMaterial";
import { DeleteMaterial } from "../../app/usecase/material/deleteMaterial";
import { FindMaterialByEventId } from "../../app/usecase/material/findMaterialByEventId";

export class MaterialController {
    constructor() {}

/**
 * @openapi 
 *   /eco-kitoto/materiais:
 *    get:
 *      summary: Lista todos os materiais de limpeza
 *      tags: [MATERIAIS DE LIMPEZA]
 *      responses:
 *       200:
 *       description: Lista recuperada com sucesso
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *           items:
 *            type: object
 *           500:
 *             description:
 *               Erro interno no servidor
 */
    async listAll(request : Request, response : Response) {

        const drizzleMaterialRepository = new DrizzleMaterialRepository()
        const listAll = new ListAll(drizzleMaterialRepository)

        try {
                const listMaterial = await listAll.execute()

                return response.json(listMaterial)

        } catch (error) {
            return response.json({ error : "Erro ao listar os materiais de limpeza!"})
        }
    }

  /**
 * @openapi
 * /eco-kitoto/materiais/novo:
 *   post:
 *     summary: Cadastra um novo material de limpeza
 *     tags: [MATERIAIS DE LIMPEZA]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Nome do material de limpeza
 *              eventId:
 *                type: string
 *                description: ID do evento ao qual o material pertence
 *     responses:
 *       201:
 *         description: Material cadastrado com sucesso!
 *       400:
 *         description: Dados inválidos (campos obrigatórios ausentes)
 *       500:
 *         description: Erro interno ao cadastrar material
 */


    async create(request : Request, response : Response) {

        const { eventId, name } = request.body

        if(!eventId || !name) {
            return response.json({ message : "Campos inválidos!"})
        }

        const drizzleMaterialRepository = new DrizzleMaterialRepository()
        const createMaterial = new CreateMaterial(drizzleMaterialRepository)

        try {
                const material = await createMaterial.execute({
                    eventId : eventId,
                    name : name
                })

                return response.json(material)

        } catch (error) {
            return response.json({ error : "Erro ao cadastrar material de limpeza!"})
        }
    }
    
/**
 * @openapi
 * /eco-kitoto/materiais/editar/{id}:
 *    patch:
 *     summary: Atualiza um material de limpeza existente
 *     tags: [MATERIAIS DE LIMPEZA]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do material que será atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Novo nome para o material
 *     responses:
 *       200:
 *         description: Material atualizado com sucesso!
 *       400:
 *         description: Erro na validação dos dados
 *       404:
 *         description: Material não encontrado
 *       500:
 *         description: Erro interno ao atualizar material
 */

    async update(request : Request, response : Response) {

        const idmaterial = String(request.params.id)
        const { name } = request.body
        
        if(!idmaterial) {
            return response.json({ message : "Material não encontrado!"})
        }

        if(!name) {
            return response.json({ message : "Campo inválido!"})
        }

        const drizzleMaterialRepository = new DrizzleMaterialRepository()
        const updateMaterial = new UpdateMaterial(drizzleMaterialRepository)

        try {
                const material = await updateMaterial.execute(idmaterial, name)

                return response.json(material)

        } catch (error) {
            return response.json({ error : "Erro ao atualizar material!"})
        }
    }

 /**
 * @openapi
 * /eco-kitoto/materiais/{id}:
 *   delete:
 *     summary: Remove um material de limpeza pelo ID
 *     tags: [MATERIAIS DE LIMPEZA]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Material eliminado com sucesso
 *       404:
 *         description: Material não encontrado
 */
    async delete(request : Request, response : Response) {

        const idmaterial = String(request.params.id)

        if(!idmaterial) {
            return response.json({ message : "Material não encontrado!"})
        }

        const drizzleMaterialRepository = new DrizzleMaterialRepository()
        const deleteMaterial = new DeleteMaterial(drizzleMaterialRepository)

        try {
                await deleteMaterial.execute(idmaterial)

                return response.json({ message : "Material eliminado com sucesso!"})

        } catch (error) {
            return response.json({ error : "Erro ao eliminar material!"})
        }
    }

 /**
 * @openapi
 * /eco-kitoto/materiais/evento/{eventId}:
 *   get:
 *     summary: Pesquisa materiais de limpeza pelo ID do evento
 *     tags: [MATERIAIS DE LIMPEZA]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de materiais do evento
 *       404:
 *         description: Material não encontrado
 */
    async findMaterialByEventId(request : Request, response : Response) {

        const eventId = String(request.params.eventId)

        if(!eventId) {
            return response.json({ message : "Evento não encontrado!"})
        }

        const drizzleMaterialRepository = new DrizzleMaterialRepository()
        const findMaterial = new FindMaterialByEventId(drizzleMaterialRepository)

        try {
                const material = await findMaterial.execute(eventId)

                return response.json(material)
                
        } catch (error) {
            return response.json({ error : "Erro ao listar os materiais do Evento de Limpeza!"})
        }
    }

}