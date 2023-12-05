const { Router } = require('express')
const ConsumoFuncionarioController = require('../controllers/consumoFuncionarioController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/consumosfuncionarios', ConsumoFuncionarioController.cadastrar)
    .get('/consumosfuncionarios', ConsumoFuncionarioController.buscarTodosConsumos)
    .get('/consumosfuncionarios/:id', ConsumoFuncionarioController.buscarConsumoPorId)
    .get('/consumosfuncionarios/funcionario/:id', ConsumoFuncionarioController.buscarConsumosPorFuncionarioId)
    .put('/consumosfuncionarios/', ConsumoFuncionarioController.editarConsumo)
    .delete('/consumosfuncionarios/:id', ConsumoFuncionarioController.deletarConsumo)

module.exports = router