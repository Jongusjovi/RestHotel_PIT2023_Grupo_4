const FornecedorService = require('../services/fornecedorService')

const fornecedorService = new FornecedorService()

class FornecedorController {
    static async cadastrar(req, res) {
        const {
            cnpj, 
            razaosocial, 
            nomefantasia,
            endereco,
            bairro,
            cidade,
            uf,
            cep,
            telefone,
            segmento,
            email
        } = req.body

        try {
            const fornecedor = await fornecedorService.cadastrar({
                cnpj, 
                razaosocial, 
                nomefantasia,
                endereco,
                bairro,
                cidade,
                uf,
                cep,
                telefone,
                segmento,
                email
            })

            res.status(201).json({
                status: true,
                mensagem: 'Fornecedor cadastrado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosFornecedores(req, res) {
        const fornecedores = await fornecedorService.buscarTodosFornecedores()

        res.status(200).json(fornecedores)
    }

    static async buscarFornecedorPorId(req, res) {
        try {
            const { id } = req.params
            const fornecedor = await fornecedorService.buscarFornecedorPorId(id)

            res.status(200).json(fornecedor)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarFornecedor(req, res) {
        const {
            id,
            cnpj, 
            razaosocial, 
            nomefantasia,
            endereco,
            bairro,
            cidade,
            uf,
            cep,
            telefone,
            segmento,
            email
        } = req.body

        try {
            const fornecedor = await fornecedorService.editarFornecedor({
                id,
                cnpj, 
                razaosocial, 
                nomefantasia,
                endereco,
                bairro,
                cidade,
                uf,
                cep,
                telefone,
                segmento,
                email
            })
            res.status(200).json({
                status: true,
                mensagem: 'Fornecedor atualizado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarFornecedor(req, res) {
        const { id } = req.body

        try {
            await fornecedorService.deletarFornecedor(id)
            res.status(200).json({
                status: true,
                mensagem: 'Fornecedor excluído com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = FornecedorController