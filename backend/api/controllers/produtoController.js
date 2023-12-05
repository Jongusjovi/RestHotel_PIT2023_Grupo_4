const ProdutoService = require('../services/produtoService')

const produtoService = new ProdutoService()

class ProdutoController {
    static async cadastrar(req, res) {
        const { nome, quantidade, preco } = req.body

        try {
            const produto = await produtoService.cadastrar({ nome, quantidade, preco })

            res.status(201).json({
                status: true,
                mensagem: 'Produto cadastrado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosProdutos(req, res) {
        const produtos = await produtoService.buscarTodosProdutos()

        res.status(200).json(produtos)
    }

    static async buscarTodosProdutosServicos(req, res) {
        const produtosservicos = await produtoService.buscarTodosProdutosServicos()

        res.status(200).json(produtosservicos)
    }

    static async buscarProdutoPorId(req, res) {
        try {
            const { id } = req.params
            const produto = await produtoService.buscarProdutoPorId(id)

            res.status(200).json(produto)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarProduto(req, res) {
        const { id, nome, quantidade, preco } = req.body

        try {
            const produto = await produtoService.editarProduto({ id, nome, quantidade, preco })
            res.status(200).json({
                status: true,
                mensagem: 'Produto atualizado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarProduto(req, res) {
        const { id } = req.body

        try {
            await produtoService.deletarProduto(id)
            res.status(200).json({
                status: true,
                mensagem: 'Produto excluído com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async relatorioProdutos(req, res) {

        const { produto, emFalta, emEstoque } = req.body

        try {
            const produtos = await produtoService.relatorioProdutos({ produto, emFalta, emEstoque })

            res.status(200).json(produtos)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }

        
    }
}

module.exports = ProdutoController