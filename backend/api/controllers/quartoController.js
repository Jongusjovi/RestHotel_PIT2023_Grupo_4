const QuartoService = require('../services/quartoService')

const quartoService = new QuartoService()

class QuartoController {
    static async cadastrar(req, res) {
        const { descricao, numero, quartotipo_id } = req.body

        try {
            const quarto = await quartoService.cadastrar({ descricao, numero, quartotipo_id })

            res.status(201).json({
                status: true,
                mensagem: 'Quarto cadastrado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosQuartos(req, res) {
        const quartos = await quartoService.buscarTodosQuartos()

        res.status(200).json(quartos)
    }

    static async buscarTodosQuartosLivres(req, res) {
        const quartos = await quartoService.buscarTodosQuartosLivres()

        res.status(200).json(quartos)
    }

    static async buscarQuartoPorId(req, res) {
        try {
            const { id } = req.params
            const quarto = await quartoService.buscarQuartoPorId(id)

            res.status(200).json(quarto)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarQuarto(req, res) {
        const { id, descricao, estado, numero, quartotipo_id } = req.body

        try {
            const quarto = await quartoService.editarQuarto({ id, descricao, estado, numero, quartotipo_id })
            res.status(200).json({
                status: true,
                mensagem: 'Quarto atualizado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
    
    static async removerLimpeza(req, res) {
        const { id } = req.params

        try {
            const quarto = await quartoService.removerLimpeza({ id })
            res.status(200).json({
                status: true,
                mensagem: 'Quarto removido da limpeza com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarQuarto(req, res) {
        const { id } = req.body

        try {
            await quartoService.deletarQuarto(id)
            res.status(200).json({
                status: true,
                mensagem: 'Quarto excluído com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = QuartoController