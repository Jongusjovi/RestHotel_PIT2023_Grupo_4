const { Sequelize, Op } = require('sequelize')
const db = require('../models')
const uuid = require('uuid')

class ConsumoService {
    async cadastrar(dto) {
        try {
            const novoConsumo = await db.consumos_hospedagens.create({
                id: uuid.v4(),
                quantidade: dto.quantidade,
                datahora: new Date(Date.now()),
                proser_id: dto.proser_id,
                hospedagem_id: dto.hospedagem_id
            })

            return novoConsumo
        } catch (error) {
            throw new Error('Erro ao cadastrar o consumo')
        }
    }

    async buscarTodosConsumos() {
        const consumos = await db.consumos_hospedagens.findAll({
            include: [
                {
                    model: db.produtos_servicos,
                    as: 'consumo_produto_servico',
                    attributes: ['id','nome', 'preco']
                },
                {
                    model: db.hospedagens,
                    as: 'consumo_hospedagem',
                    attributes: ['id']
                }
            ]
        })
        return consumos
    }

    async buscarConsumoPorId(id) {
        const consumo = await db.consumos_hospedagens.findOne({
            include: [
                {
                    model: db.produtos_servicos,
                    as: 'consumo_proser',
                    attributes: ['id','nome', 'preco']
                },
                {
                    model: db.hospedagens,
                    as: 'consumo_hospedagem',
                    attributes: ['id']
                }
            ],
            where: {
                id: id
            }
        })

        if (!consumo) {
            throw new Error('Consumo informado não cadastrado')
        }

        return consumo
    }

    async buscarConsumosPorHospedagemId(id) {
        const hospedagem = await db.hospedagens.findOne({
            where: {
                id: id
            }
        })

        if (!hospedagem) {
            throw new Error('Hospedagem informada não cadastrada')
        }
        
        const consumos = await db.consumos_hospedagens.findAll({
            include: [
                {
                    model: db.produtos_servicos,
                    as: 'consumo_proser',
                    attributes: ['id','nome', 'preco']
                }
            ],
            where: {
                hospedagem_id: id
            }
        })

        if (!consumos) {
            throw new Error('Hospedagem sem consumos')
        }

        return consumos
    }

    async editarConsumo(dto) {
        const consumo = await this.buscarConsumoPorId(dto.id)
        
        try {
            consumo.quantidade = dto.quantidade
            consumo.datahora = dto.datahora

            await consumo.save()
            return consumo
        } catch (error) {
            throw new Error('Erro ao editar consumo')
        }
    }

    async deletarConsumo(id) {
        await this.buscarConsumoPorId(id)

        try {
            await db.consumos_hospedagens.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o consumo')
        }
    }

    async relatorioConsumos(dto) {
        const dtInicial = dto.periodo.dataInicio.split("T")[0] + ' 00:00:00'
        const dtFinal = dto.periodo.dataFim.split("T")[0] + ' 23:59:59'

        const whereCondition = {}
        const whereProdCondition = {}

        if (dto.produto != '') {
            whereProdCondition.nome = {
                [Op.like]: '%' + dto.produto + '%'
            }
        }

        if (dto.periodo.dataInicio != '' && dto.periodo.dataFim != '') {
            whereCondition.datahora = {
                [Op.gte]: dtInicial,
                [Op.lte]: dtFinal
            }
        }

        const consumos = await db.consumos_hospedagens.findAll({
            attributes: [[Sequelize.fn('SUM', Sequelize.col('consumos_hospedagens.quantidade')), 'quantidade']],
            include: [
                {
                    model: db.produtos_servicos,
                    as: 'consumo_proser',
                    attributes: ['id','nome', 'preco'],
                    where: whereProdCondition
                }
            ],
            where: whereCondition,
            group: ['proser_id'],
            order: [[Sequelize.col('consumo_proser.nome'), 'ASC']]
        })

        return consumos
    }
}

module.exports = ConsumoService