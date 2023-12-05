const { Router } = require('express')
const FuncaoController = require('../controllers/funcaoController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/funcoes', FuncaoController.cadastrar)
    .get('/funcoes', FuncaoController.buscarTodasFuncoes)
    .get('/funcoes/:id', FuncaoController.buscarFuncaoPorId)
    .put('/funcoes/', FuncaoController.editarFuncao)
    .delete('/funcoes', FuncaoController.deletarFuncao)

module.exports = router