const bodyParser = require('body-parser')

const auth = require('./authRoute')
const nivel = require('./nivelRoute')
const usuario = require('./usuarioRoute')
const funcao = require('./funcaoRoute')
const funcionario = require('./funcionarioRoute')
const cliente = require('./clienteRoute')
const fornecedor = require('./fornecedorRoute')
const produto = require('./produtoRoute')
const servico = require('./servicoRoute')
const quarto = require('./quartoRoute')
const tipoquarto = require('./quartotipoRoute')
const hospedagem = require('./hospedagemRoute')
const consumo = require('./consumoRoute')
const consumoFuncionario = require('./consumoFuncionarioRoute')
const reservas = require('./reservaRoute')
const itensMenus = require('./itemMenuRoute')
const menus = require('./menuRoute')
const permissoes = require('./permissaoRoute')
const categorias_despesas = require('./categoriaDespesaRoute')
const despesas = require('./despesaRoute')

module.exports = app => {
    app.use(
        bodyParser.json(),
        usuario,
        auth,
        nivel,
        funcao,
        funcionario,
        cliente,
        fornecedor,
        produto,
        servico,
        quarto,
        tipoquarto,
        hospedagem,
        consumo,
        consumoFuncionario,
        categorias_despesas,
        despesas,
        reservas,
        itensMenus,
        menus,
        permissoes
    )
}