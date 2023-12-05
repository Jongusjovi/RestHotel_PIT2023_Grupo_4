const { Router } = require('express')
const PermissaoController = require('../controllers/permissaoController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/permissoes', PermissaoController.cadastrar)
    .get('/permissoes', PermissaoController.buscarTodasPermissoes)
    .get('/permissoes/:id', PermissaoController.buscarPermissoesPorNivelId)
    .put('/permissoes', PermissaoController.editarPermissoesPorNivelId)
    .delete('/permissoes', PermissaoController.deletarPermissoesPorNivelId)

module.exports = router