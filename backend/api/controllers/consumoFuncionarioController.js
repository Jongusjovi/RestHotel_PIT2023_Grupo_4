const ConsumoFuncionarioService = require('../services/consumoFuncionarioService')

const consumoFuncionarioService = new ConsumoFuncionarioService()

class ConsumoFuncionarioController {
    static async cadastrar(req, res) {
        const { quantidade, datahora, proser_id, funcionario_id } = req.body

        try {
            const consumo = await consumoFuncionarioService.cadastrar({ quantidade, datahora, proser_id, funcionario_id })

            res.status(201).json({
                status: true,
                mensagem: 'Consumo cadastrado com sucesso!',
                consumo: consumo
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosConsumos(req, res) {
        const consumos = await consumoFuncionarioService.buscarTodosConsumos()

        res.status(200).json(consumos)
    }

    static async buscarConsumoPorId(req, res) {
        try {
            const { id } = req.params
            const consumo = await consumoFuncionarioService.buscarConsumoPorId(id)

            res.status(200).json(consumo)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarConsumosPorFuncionarioId(req, res) {
        try {
            const { id } = req.params
            const consumos = await consumoFuncionarioService.buscarConsumosPorFuncionarioId(id)

            res.status(200).json(consumos)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarConsumo(req, res) {
        const { id, quantidade, datahora, proser_id, funcionario_id } = req.body

        try {
            const consumo = await consumoFuncionarioService.editarConsumo({ id, quantidade, datahora, proser_id, funcionario_id })

            res.status(200).json({
                status: true,
                mensagem: 'Consumo atualizado com sucesso!',
                consumo: consumo
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarConsumo(req, res) {
        const { id } = req.params

        try {
            await consumoFuncionarioService.deletarConsumo(id)

            res.status(200).json({
                status: true,
                mensagem: 'Consumo excluído com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = ConsumoFuncionarioController