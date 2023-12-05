const { Router } = require('express')
const FuncionarioController = require('../controllers/funcionarioController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/funcionarios', FuncionarioController.cadastrar)
    .post('/funcionariospornome', FuncionarioController.buscarFuncionarioPorNome)
    .get('/funcionarios', FuncionarioController.buscarTodosFuncionarios)
    .get('/funcionarios/:id', FuncionarioController.buscarFuncionarioPorId)
    .put('/funcionarios', FuncionarioController.editarFuncionario)
    .delete('/funcionarios', FuncionarioController.deletarFuncionario)

module.exports = router