const MenuService = require('../services/menuService')

const menuService = new MenuService()

class MenuController {
    static async cadastrar(req, res) {
        const { nome, caminho } = req.body

        try {
            const menu = await menuService.cadastrar({ nome, caminho })

            res.status(201).json({
                status: true,
                mensagem: 'Menu cadastrado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosMenus(req, res) {
        const menus = await menuService.buscarTodosMenus()

        res.status(200).json(menus)
    }

    static async buscarMenuPorId(req, res) {
        try {
            const { id } = req.params
            const menu = await menuService.buscarMenuPorId(id)

            res.status(200).json(menu)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarMenu(req, res) {
        const { id, nome, caminho } = req.body

        try {
            const menu = await menuService.editarMenu({ id, nome, caminho })
            res.status(200).json({
                status: true,
                mensagem: 'Menu atualizado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarMenu(req, res) {
        const { id } = req.body

        try {
            await menuService.deletarFuncao(id)
            res.status(200).json({
                status: true,
                mensagem: 'Menu excluído com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = MenuController