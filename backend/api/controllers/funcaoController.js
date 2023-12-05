const FuncaoService = require('../services/funcaoService')

const funcaoService = new FuncaoService()

class FuncaoController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body

        try {
            const funcao = await funcaoService.cadastrar({ nome, descricao })

            res.status(201).json({
                status: true,
                mensagem: 'Função cadastrada com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodasFuncoes(req, res) {
        const funcoes = await funcaoService.buscarTodasFuncoes()

        res.status(200).json(funcoes)
    }

    static async buscarFuncaoPorId(req, res) {
        try {
            const { id } = req.params
            const funcao = await funcaoService.buscarFuncaoPorId(id)

            res.status(200).json(funcao)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarFuncao(req, res) {
        const { id, nome, descricao } = req.body

        try {
            const funcao = await funcaoService.editarFuncao({ id, nome, descricao })
            res.status(200).json({
                status: true,
                mensagem: 'Função atualizada com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarFuncao(req, res) {
        const { id } = req.body

        try {
            await funcaoService.deletarFuncao(id)
            res.status(200).json({
                status: true,
                mensagem: 'Função excluída com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = FuncaoController