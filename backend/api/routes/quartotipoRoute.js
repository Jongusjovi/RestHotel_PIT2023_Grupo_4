const { Router } = require('express')
const QuartoTipoController = require('../controllers/quartotipoController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/tiposquartos', QuartoTipoController.cadastrar)
    .get('/tiposquartos', QuartoTipoController.buscarTodosTiposQuarto)
    .get('/tiposquartos/:id', QuartoTipoController.buscarTipoQuartoPorId)
    .put('/tiposquartos/', QuartoTipoController.editarTipoQuarto)
    .delete('/tiposquartos', QuartoTipoController.deletarTipoQuarto)

module.exports = router