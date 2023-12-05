const { Sequelize } = require('sequelize')
const db = require('../models')
const uuid = require('uuid')

class QuartoService {
    async cadastrar(dto) {
        const quarto = await db.quartos.findOne({
            where: {
                numero: dto.numero
            }
        })

        if (quarto) {
            throw new Error('Quarto já cadastrado')
        }

        try {
            const novoQuarto = await db.quartos.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao,
                numero: dto.numero,
                quartotipo_id: dto.quartotipo_id
            })

            return novoQuarto
        } catch (error) {
            throw new Error('Erro ao cadastrar quarto')
        }
    }

    async buscarTodosQuartos() {
        const quartos = await db.quartos.findAll({
            include: [{
                model: db.quartostipos,
                as: 'quarto_tipoquarto',
                attributes: ['id','nome']
            }],
            order: [['numero','ASC']]
        })

        return quartos
    }

    async buscarTodosQuartosLivres() {
        const quartos = await db.quartos.findAll({
            include: [{
                model: db.quartostipos,
                as: 'quarto_tipoquarto',
                attributes: ['id','nome']
            }],
            where: {
                estado: 0
            },
            order: [['numero','ASC']]
        })
        return quartos
    }

    async buscarQuartoPorId(id) {
        const quarto = await db.quartos.findOne({
            include: [{
                model: db.quartostipos,
                as: 'quarto_tipoquarto',
                attributes: ['id','nome']
            }],
            where: {
                id: id
            }
        })

        if (!quarto) {
            throw new Error('Quarto informado não cadastrado')
        }

        return quarto
    }

    async editarQuarto(dto) {
        const quarto = await this.buscarQuartoPorId(dto.id)
        
        try {
            quarto.nome = dto.nome,
            quarto.descricao = dto.descricao,
            quarto.numero = dto.numero,
            quarto.estado = dto.estado,
            quarto.quartotipo_id = dto.quartotipo_id

            await quarto.save()
            return quarto
        } catch (error) {
            throw new Error('Erro ao editar quarto')
        }
    }

    async removerLimpeza(dto) {
        const quarto = await this.buscarQuartoPorId(dto.quarto_id)
        
        try {
            quarto.estado = 0

            await quarto.save()
            return quarto
        } catch (error) {
            throw new Error('Erro ao remover quarto da limpeza')
        }
    }

    async deletarQuarto(id) {
        await this.buscarQuartoPorId(id)

        try {
            await db.quartos.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o quarto')
        }
    }
}

module.exports = QuartoService