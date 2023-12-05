const HospedagemService = require('../services/hospedagemService')
const QuartoService = require('../services/quartoService')

const hospedagemService = new HospedagemService()
const quartoService = new QuartoService()

class HospedagemController {
    static async cadastrar(req, res) {
        const { checkin, quarto_id, cliente_id } = req.body

        try {
            const hospedagem = await hospedagemService.cadastrar({ checkin, quarto_id, cliente_id })

            res.status(201).json({
                status: true,
                mensagem: 'Hospedagem cadastrada com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodasHospedagens(req, res) {
        const hospedagens = await hospedagemService.buscarTodasHospedagens()

        res.status(200).json(hospedagens)
    }

    static async buscarHospedagemPorId(req, res) {
        try {
            const { id } = req.params
            const hospedagem = await hospedagemService.buscarHospedagemPorId(id)

            res.status(200).json(hospedagem)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async atualizarSubTotalConsumosProdutos(req, res) {
        try {
            const { id } = req.body
            const hospedagem = await hospedagemService.atualizarSubTotalConsumosProdutos(id)

            res.status(200).json(hospedagem)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarHospedagem(req, res) {
        const { id, checkin, checkout, total_consumo, quarto_id, cliente_id,  } = req.body

        try {
            const hospedagem = await hospedagemService.editarHospedagem({ id, checkin, checkout, total_consumo, quarto_id, cliente_id })
            res.status(200).json({
                status: true,
                mensagem: 'Hospedagem atualizada com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarHospedagem(req, res) {
        const { id } = req.body

        try {
            await hospedagemService.deletarHospedagem(id)
            res.status(200).json({
                status: true,
                mensagem: 'Hospedagem excluída com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async checkout(req, res) {
        const { id, checkout, total_consumo, valor_total, quarto_id, funcionario_id } = req.body

        try {
            const hospedagem = await hospedagemService.checkout({ id, checkout, total_consumo, valor_total, quarto_id, funcionario_id })
            res.status(200).json({
                status: true,
                mensagem: 'Check-out realizado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async removerLimpeza(req, res) {
        const { hospedagem_id, quarto_id } = req.body

        try {
            const hospedagem = await hospedagemService.removerLimpeza({ hospedagem_id })
            const quarto = await quartoService.removerLimpeza({ quarto_id })

            res.status(200).json({
                status: true,
                mensagem: 'Apto. removido da limpeza com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async relatorioHospedagens(req, res) {

        const { dataInicio, dataFim } = req.body

        try {
            const hospedagens = await hospedagemService.relatorioHospedagens({ dataInicio, dataFim })

            res.status(200).json(hospedagens)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }

        
    }
}

module.exports = HospedagemController