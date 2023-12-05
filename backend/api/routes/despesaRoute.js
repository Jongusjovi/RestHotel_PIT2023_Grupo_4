const { Router } = require('express')
const DespesaController = require('../controllers/despesaController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/despesas', DespesaController.cadastrar)
    .post('/despesas/relatorio', DespesaController.relatorioDespesas)
    .get('/despesas', DespesaController.buscarTodasDespesas)
    .get('/despesas/:id', DespesaController.buscarDespesaPorId)
    .put('/despesas', DespesaController.editarDespesa)
    .delete('/despesas', DespesaController.deletarDespesa)

module.exports = router