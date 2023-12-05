const db = require('../models')
const uuid = require('uuid')

class CategoriaDespesaService {
    async cadastrar(dto) {
        const categoria = await db.categorias_despesas.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (categoria) {
            throw new Error('Categoria de despesa já cadastrada')
        }

        try {
            const novaCategoria = await db.categorias_despesas.create({
                id: uuid.v4(),
                nome: dto.nome
            })

            return novaCategoria
        } catch (error) {
            throw new Error('Erro ao cadastrar categoria de despesa.')
        }
    }

    async buscarTodasCategorias() {
        const categorias = await db.categorias_despesas.findAll()
        return categorias
    }

    async buscarCategoriaPorId(id) {
        const categoria = await db.categorias_despesas.findOne({
            where: {
                id: id
            }
        })

        if (!categoria) {
            throw new Error('Categoria de despesa informada não cadastrada.')
        }

        return categoria
    }

    async editarCategoria(dto) {
        const categoria = await this.buscarCategoriaPorId(dto.id)
        
        try {
            categoria.nome = dto.nome

            await categoria.save()
            return categoria
        } catch (error) {
            throw new Error('Erro ao editar categoria de despesa.')
        }
    }

    async deletarCategoria(id) {
        try {
            await db.categorias_despesas.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir a categoria de despesa.')
        }
    }
}

module.exports = CategoriaDespesaService