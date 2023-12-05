const { Router } = require('express')
const MenuController = require('../controllers/menuController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/menus', MenuController.cadastrar)
    .get('/menus', MenuController.buscarTodosMenus)
    .get('/menus/:id', MenuController.buscarMenuPorId)
    .put('/menus', MenuController.editarMenu)
    .delete('/menus', MenuController.deletarMenu)

module.exports = router