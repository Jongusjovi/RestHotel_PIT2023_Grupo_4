const { Router } = require('express')
const ItemMenuController = require('../controllers/itemMenuController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/itemmenu', ItemMenuController.cadastrar)
    .get('/itemmenu', ItemMenuController.buscarTodosItens)
    .get('/itemmenu/:id', ItemMenuController.buscarItemMenuPorId)
    .put('/itemmenu/', ItemMenuController.editarItemMenu)
    .delete('/itemmenu', ItemMenuController.deletarItemMenu)

module.exports = router