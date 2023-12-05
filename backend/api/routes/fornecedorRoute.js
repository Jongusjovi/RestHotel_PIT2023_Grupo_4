const { Router } = require('express')
const FornecedorController = require('../controllers/fornecedorController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/fornecedores', FornecedorController.cadastrar)
    .get('/fornecedores', FornecedorController.buscarTodosFornecedores)
    .get('/fornecedores/:id', FornecedorController.buscarFornecedorPorId)
    .put('/fornecedores/', FornecedorController.editarFornecedor)
    .delete('/fornecedores', FornecedorController.deletarFornecedor)

module.exports = router