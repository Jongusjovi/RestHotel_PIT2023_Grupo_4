const PermissaoService = require('../services/permissaoService')

const permissaoService = new PermissaoService()

class PermissaoController {
    static async cadastrar(req, res) {
        const dados = req.body
        const nivel = dados.nivel_id
        const permissoes = dados.permissoes

        try {
            const permissao = await permissaoService.cadastrar({ nivel, permissoes })

            res.status(201).json({
                status: true,
                mensagem: 'Permissões de nível de usuário cadastradas com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodasPermissoes(req, res) {
        const menus = await permissaoService.buscarTodasPermissoes()

        res.status(200).json(menus)
    }

    static async buscarPermissoesPorNivelId(req, res) {
        try {
            const { id } = req.params
            const permissoes = await permissaoService.buscarPermissoesPorNivelId(id)

            res.status(200).json(permissoes)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarPermissoesPorNivelId(req, res) {
        const dados = req.body
        const nivel = dados.nivel_id
        const permissoes = dados.permissoes

        try {
            const permissao = await permissaoService.editarPermissoesPorNivelId({ nivel, permissoes })

            res.status(201).json({
                status: true,
                mensagem: 'Permissões de nível de usuário alteradas com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarPermissoesPorNivelId(req, res) {
        const { id } = req.body

        try {
            await permissaoService.deletarPermissoesPorNivelId(id)
            res.status(200).json({
                status: true,
                mensagem: 'Permissões excluídas com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = PermissaoController