const { Router } = require('express')
const ReservaController = require('../controllers/reservaController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/reservas', ReservaController.cadastrar)
    .post('/reservas/filtrarperiodo', ReservaController.filtrarPeriodo)
    .post('/reservas/relatorio', ReservaController.relatorioReservas)
    .get('/reservas', ReservaController.buscarTodasReservas)
    .get('/reservas/:id', ReservaController.buscarReservaPorId)
    .put('/reservas/', ReservaController.editarReserva)
    .delete('/reservas', ReservaController.deletarReserva)

module.exports = router