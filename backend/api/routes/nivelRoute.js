const { Router } = require('express')
const NivelController = require('../controllers/nivelController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/niveis', NivelController.cadastrar)
    .get('/niveis', NivelController.buscarTodosNiveis)
    .get('/niveis/sempermissoes', NivelController.buscarTodosNiveisSemPermissoes)
    .get('/niveis/compermissoes', NivelController.buscarTodosNiveisComPermissoes)
    .get('/niveis/:id', NivelController.buscarNivelPorId)
    .get('/niveis/permissoes/:id', NivelController.buscarPermissoesPorNivelId)
    .get('/niveis/permissoesmenus/:id', NivelController.buscarPermissoesMenusPorNivelId)
    .get('/niveis/permissoessubmenus/:id', NivelController.buscarPermissoesSubMenusPorNivelId)
    .put('/niveis', NivelController.editarNivel)
    .delete('/niveis', NivelController.deletarNivel)

module.exports = router