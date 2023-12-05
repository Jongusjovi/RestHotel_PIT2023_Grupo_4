const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/produtos', ProdutoController.cadastrar)
    .post('/produtos/relatorio', ProdutoController.relatorioProdutos)
    .get('/produtos', ProdutoController.buscarTodosProdutos)
    .get('/produtosservicos', ProdutoController.buscarTodosProdutosServicos)
    .get('/produtos/:id', ProdutoController.buscarProdutoPorId)
    .put('/produtos/', ProdutoController.editarProduto)
    .delete('/produtos', ProdutoController.deletarProduto)

module.exports = router