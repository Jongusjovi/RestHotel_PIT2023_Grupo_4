const { Router } = require('express')
const QuartoController = require('../controllers/quartoController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/quartos', QuartoController.cadastrar)
    .get('/quartos', QuartoController.buscarTodosQuartos)
    .get('/quartoslivres', QuartoController.buscarTodosQuartosLivres)
    .get('/quartos/:id', QuartoController.buscarQuartoPorId)
    .put('/quartos', QuartoController.editarQuarto)
    .put('/quartos/:id', QuartoController.removerLimpeza)
    .delete('/quartos', QuartoController.deletarQuarto)

module.exports = router