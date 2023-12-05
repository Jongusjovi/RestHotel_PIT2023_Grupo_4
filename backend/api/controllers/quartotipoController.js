const QuartoTipoService = require('../services/quartotipoService')

const quartoTipoService = new QuartoTipoService()

class QuartoTipoController {
    static async cadastrar(req, res) {
        const { nome, descricao, valor_diaria } = req.body

        try {
            const tipoquarto = await quartoTipoService.cadastrar({ nome, descricao, valor_diaria })

            res.status(201).json({
                status: true,
                mensagem: 'Tipo de quarto cadastrado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosTiposQuarto(req, res) {
        const tiposquartos = await quartoTipoService.buscarTodosTiposQuartos()

        res.status(200).json(tiposquartos)
    }

    static async buscarTipoQuartoPorId(req, res) {
        try {
            const { id } = req.params
            const tipoquarto = await quartoTipoService.buscarTipoQuartoPorId(id)

            res.status(200).json(tipoquarto)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarTipoQuarto(req, res) {
        const { id, nome, descricao, valor_diaria } = req.body

        try {
            const tipoquarto = await quartoTipoService.editarTipoQuarto({ id, nome, descricao, valor_diaria })
            res.status(200).json({
                status: true,
                mensagem: 'Tipo de quarto atualizado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarTipoQuarto(req, res) {
        const { id } = req.body

        try {
            await quartoTipoService.deletarTipoQuarto(id)
            res.status(200).json({
                status: true,
                mensagem: 'Tipo de quarto excluído com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = QuartoTipoController