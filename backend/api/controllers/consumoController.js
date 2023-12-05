const ConsumoService = require('../services/consumoService')

const consumoService = new ConsumoService()

class ConsumoController {
    static async cadastrar(req, res) {
        const { quantidade, datahora, proser_id, hospedagem_id } = req.body

        try {
            const consumo = await consumoService.cadastrar({ quantidade, datahora, proser_id, hospedagem_id })

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
        const consumos = await consumoService.buscarTodosConsumos()

        res.status(200).json(consumos)
    }

    static async buscarConsumoPorId(req, res) {
        try {
            const { id } = req.params
            const consumo = await consumoService.buscarConsumoPorId(id)

            res.status(200).json(consumo)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarConsumosPorHospedagemId(req, res) {
        try {
            const { id } = req.params
            const consumos = await consumoService.buscarConsumosPorHospedagemId(id)

            res.status(200).json(consumos)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarConsumo(req, res) {
        const { id, quantidade, datahora, proser_id, hospedagem_id } = req.body

        try {
            const consumo = await consumoService.editarConsumo({ id, quantidade, datahora, proser_id, hospedagem_id })

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
        const { id } = req.body

        try {
            await consumoService.deletarConsumo(id)

            res.status(200).json({
                status: true,
                mensagem: 'Consumo excluído com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async relatorioConsumos(req, res) {

        const { produto, periodo } = req.body

        try {
            const consumos = await consumoService.relatorioConsumos({ produto, periodo })

            res.status(200).json(consumos)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }

        
    }
}

module.exports = ConsumoController