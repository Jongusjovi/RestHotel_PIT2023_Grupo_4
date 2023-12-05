const { Router } = require('express')
const ClienteController = require('../controllers/clienteController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/clientes', ClienteController.cadastrar)
    .get('/clientes', ClienteController.buscarTodosClientes)
    .get('/clientes/:id', ClienteController.buscarClientePorId)
    .put('/clientes/', ClienteController.editarCliente)
    .delete('/clientes', ClienteController.deletarCliente)

module.exports = router