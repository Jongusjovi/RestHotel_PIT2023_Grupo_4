const { Router } = require('express')
const ConsumoController = require('../controllers/consumoController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/consumos', ConsumoController.cadastrar)
    .post('/consumos/relatorio', ConsumoController.relatorioConsumos)
    .get('/consumos', ConsumoController.buscarTodosConsumos)
    .get('/consumos/:id', ConsumoController.buscarConsumoPorId)
    .get('/consumos/hospedagem/:id', ConsumoController.buscarConsumosPorHospedagemId)
    .put('/consumos/', ConsumoController.editarConsumo)
    .delete('/consumos', ConsumoController.deletarConsumo)

module.exports = router