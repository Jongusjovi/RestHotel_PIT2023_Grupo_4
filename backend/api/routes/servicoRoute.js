const { Router } = require('express')
const ServicoController = require('../controllers/servicoController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/servicos', ServicoController.cadastrar)
    .get('/servicos', ServicoController.buscarTodosServicos)
    .get('/servicos/:id', ServicoController.buscarServicoPorId)
    .put('/servicos', ServicoController.editarServico)
    .delete('/servicos', ServicoController.deletarServico)

module.exports = router