const { Sequelize, Op } = require('sequelize')
const conversao = require('../Funcoes/conversao')
const db = require('../models')
const uuid = require('uuid')

class ProdutoService {
    async cadastrar(dto) {
        const produto = await db.produtos_servicos.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (produto) {
            throw new Error('Produto já cadastrado')
        }

        try {
            const novoProduto = await db.produtos_servicos.create({
                id: uuid.v4(),
                nome: dto.nome,
                quantidade: dto.quantidade,
                preco: conversao.CurrencyConvert(dto.preco),
                tipo: 'P'
            })

            return novoProduto
        } catch (error) {
            throw new Error('Erro ao cadastrar produto')
        }
    }

    async buscarTodosProdutos() {
        const produtos = await db.produtos_servicos.findAll({
            where: {
                tipo: 'P'
            }
        })
        return produtos
    }

    async buscarTodosProdutosServicos() {
        const produtos = await db.produtos_servicos.findAll()
        return produtos
    }

    async buscarProdutoPorId(id) {
        const produto = await db.produtos_servicos.findOne({
            where: {
                id: id
            }
        })

        if (!produto) {
            throw new Error('Produto informado não cadastrado')
        }

        return produto
    }

    async editarProduto(dto) {
        const produto = await this.buscarProdutoPorId(dto.id)
        
        try {
            produto.nome = dto.nome
            produto.quantidade = dto.quantidade
            produto.preco = dto.preco

            await produto.save()
            return produto
        } catch (error) {
            throw new Error('Erro ao editar produto')
        }
    }

    async deletarProduto(id) {
        await this.buscarProdutoPorId(id)

        try {
            await db.produtos_servicos.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o produto')
        }
    }

    async relatorioProdutos(dto) {
        const whereCondition = {
            tipo: 'P'
        }

        if (dto.emFalta) {
            whereCondition.quantidade = {
                [Op.lte]: 0
            }
        }
        else if (dto.emEstoque) {
            whereCondition.quantidade = {
                [Op.gte]: 1
            }
        }

        if (dto.produto != '') {
            whereCondition.nome = {
                [Op.like]: '%' + dto.produto + '%'
            }
        }

        const produtos = await db.produtos_servicos.findAll({
            where: whereCondition,
            order: [[Sequelize.col('nome'), 'ASC']]
        })

        return produtos
    }
}

module.exports = ProdutoService