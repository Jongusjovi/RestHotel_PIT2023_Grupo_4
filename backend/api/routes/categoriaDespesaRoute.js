const { Router } = require('express')
const CategoriaDespesaController = require('../controllers/categoriaDespesaController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/categorias_despesas', CategoriaDespesaController.cadastrar)
    .get('/categorias_despesas', CategoriaDespesaController.buscarTodasCategorias)
    .get('/categorias_despesas/:id', CategoriaDespesaController.buscarCategoriaPorId)
    .put('/categorias_despesas/', CategoriaDespesaController.editarCategoria)
    .delete('/categorias_despesas', CategoriaDespesaController.deletarCategoria)

module.exports = router