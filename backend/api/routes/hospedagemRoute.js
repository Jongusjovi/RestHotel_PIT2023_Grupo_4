const { Router } = require('express')
const HospedagemController = require('../controllers/hospedagemController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/hospedagens', HospedagemController.cadastrar)
    .post('/hospedagens/relatorio', HospedagemController.relatorioHospedagens)
    .get('/hospedagens', HospedagemController.buscarTodasHospedagens)
    .get('/hospedagens/:id', HospedagemController.buscarHospedagemPorId)
    .put('/hospedagens/subtotal', HospedagemController.atualizarSubTotalConsumosProdutos)
    .put('/hospedagens/checkout', HospedagemController.checkout)
    .put('/hospedagens/removerlimpeza', HospedagemController.removerLimpeza)
    .put('/hospedagens/', HospedagemController.editarHospedagem)
    .delete('/hospedagens', HospedagemController.deletarHospedagem)

module.exports = router