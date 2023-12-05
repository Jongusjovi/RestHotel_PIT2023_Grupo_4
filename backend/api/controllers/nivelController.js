const NivelService = require('../services/nivelService')

const nivelService = new NivelService()

class NivelController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body

        try {
            const nivel = await nivelService.cadastrar({ nome, descricao })

            res.status(201).json({
                status: true,
                mensagem: 'Nível de usuário cadastrado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosNiveis(req, res) {
        const niveis = await nivelService.buscarTodosNiveis()

        res.status(200).json(niveis)
    }
    
    static async buscarTodosNiveisSemPermissoes(req, res) {
        const niveis = await nivelService.buscarTodosNiveisSemPermissoes()

        res.status(200).json(niveis)
    }

    static async buscarTodosNiveisComPermissoes(req, res) {
        const niveis = await nivelService.buscarTodosNiveisComPermissoes()

        res.status(200).json(niveis)
    }

    static async buscarNivelPorId(req, res) {
        try {
            const { id } = req.params
            const nivel = await nivelService.buscarNivelPorId(id)

            res.status(200).json(nivel)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarPermissoesPorNivelId(req, res) {
        try {
            const { id } = req.params
            const nivel = await nivelService.buscarPermissoesPorNivelId(id)

            res.status(200).json(nivel)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarPermissoesMenusPorNivelId(req, res) {
        try {
            const { id } = req.params
            const nivel = await nivelService.buscarPermissoesMenusPorNivelId(id)

            res.status(200).json(nivel)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
    
    static async buscarPermissoesSubMenusPorNivelId(req, res) {
        try {
            const { id } = req.params
            const nivel = await nivelService.buscarPermissoesSubMenusPorNivelId(id)

            res.status(200).json(nivel)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarNivel(req, res) {
        const { id, nome, descricao } = req.body

        try {
            const nivel = await nivelService.editarNivel({ id, nome, descricao })
            res.status(200).json({
                status: true,
                mensagem: 'Nível de usuário atualizado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarNivel(req, res) {
        const { id } = req.body

        try {
            await nivelService.deletarNivel(id)
            res.status(200).json({
                status: true,
                mensagem: 'Nível de usuário cadastrado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = NivelController