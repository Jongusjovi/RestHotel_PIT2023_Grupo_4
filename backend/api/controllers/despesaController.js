const DespesaService = require('../services/despesaService')

const despesaService = new DespesaService()

class DespesaController {
    static async cadastrar(req, res) {
        const { descricao, valor, vencimento, pago, valor_pago, descontos, multa_juros, pagamento, categoria_id } = req.body

        try {
            const despesa = await despesaService.cadastrar({ descricao, valor, vencimento, pago, valor_pago, descontos, multa_juros, pagamento, categoria_id })

            res.status(201).json({
                status: true,
                mensagem: 'Despesa cadastrada com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodasDespesas(req, res) {
        const despesas = await despesaService.buscarTodasDespesas()

        res.status(200).json(despesas)
    }

    static async buscarDespesaPorId(req, res) {
        try {
            const { id } = req.params
            const despesa = await despesaService.buscarDespesaPorId(id)

            res.status(200).json(despesa)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarDespesa(req, res) {
        const { id, descricao, valor, vencimento, pago, valor_pago, descontos, multa_juros, pagamento, categoria_id } = req.body

        try {
            const despesa = await despesaService.editarDespesa({ id, descricao, valor, vencimento, pago, valor_pago, descontos, multa_juros, pagamento, categoria_id })
            res.status(200).json({
                status: true,
                mensagem: 'Despesa atualizada com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
    
    static async deletarDespesa(req, res) {
        const { id } = req.body

        try {
            await despesaService.deletarDespesa(id)
            res.status(200).json({
                status: true,
                mensagem: 'Despesa excluída com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async relatorioDespesas(req, res) {

        const { emAberto, periodo } = req.body

        try {
            const despesas = await despesaService.relatorioDespesas({ emAberto, periodo })

            res.status(200).json(despesas)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }

        
    }
}

module.exports = DespesaController