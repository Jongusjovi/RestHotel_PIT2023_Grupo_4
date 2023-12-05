const ItemMenuService = require('../services/itemMenuService')

const itemMenuService = new ItemMenuService()

class ItemMenuController {
    static async cadastrar(req, res) {
        const { nome, menu_id, caminho } = req.body

        try {
            const itemMenu = await itemMenuService.cadastrar({ nome, menu_id, caminho })

            res.status(201).json({
                status: true,
                mensagem: 'Item de Menu cadastrado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosItens(req, res) {
        const itemMenu = await itemMenuService.buscarTodosItens()

        res.status(200).json(itemMenu)
    }

    static async buscarItemMenuPorId(req, res) {
        try {
            const { id } = req.params
            const itemMenu = await itemMenuService.buscarItemMenuPorId(id)

            res.status(200).json(itemMenu)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarItemMenu(req, res) {
        const { id, nome, menu_id, caminho } = req.body

        try {
            const itemMenu = await itemMenuService.editarItemMenu({ id, nome, menu_id, caminho })
            res.status(200).json({
                status: true,
                mensagem: 'Item de Menu atualizado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarItemMenu(req, res) {
        const { id } = req.body

        try {
            await itemMenuService.deletarItemMenu(id)
            res.status(200).json({
                status: true,
                mensagem: 'Item de Menu excluído com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = ItemMenuController