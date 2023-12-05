const ServicoService = require('../services/servicoService')

const servicoService = new ServicoService()

class ServicoController {
    static async cadastrar(req, res) {
        const { nome, preco } = req.body
        const precoFloat = parseFloat(preco).toFixed(2)

        try {
            const servico = await servicoService.cadastrar({ nome, preco })

            res.status(201).json({
                status: true,
                mensagem: 'Serviço cadastrado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosServicos(req, res) {
        const servicos = await servicoService.buscarTodosServicos()

        res.status(200).json(servicos)
    }

    static async buscarServicoPorId(req, res) {
        try {
            const { id } = req.params
            const servico = await servicoService.buscarServicoPorId(id)

            res.status(200).json(servico)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarServico(req, res) {
        const { id, nome, preco } = req.body
        const precoFloat = parseFloat(preco).toFixed(2)

        try {
            const servico = await servicoService.editarServico({ id, nome, quantidade, precoFloat })
            res.status(200).json({
                status: true,
                mensagem: 'Serviço atualizado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarServico(req, res) {
        const { id } = req.body

        try {
            await servicoService.deletarServico(id)
            res.status(200).json({
                status: true,
                mensagem: 'Serviço excluído com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = ServicoController