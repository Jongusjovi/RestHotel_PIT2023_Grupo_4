const { Sequelize, Op } = require('sequelize')
const db = require('../models')
const uuid = require('uuid')

class DespesaService {
    async cadastrar(dto) {
        try {
            const novaDespesa = await db.despesas.create({
                id: uuid.v4(),
                descricao: dto.descricao,
                valor: dto.valor,
                vencimento: dto.vencimento,
                pago: dto.pago,
                valor_pago: dto.valor_pago,
                descontos: dto.descontos,
                multas_juros: dto.multas_juros,
                pagamento: dto.pagamento,
                categoria_id: dto.categoria_id
            })

            return novaDespesa
        } catch (error) {
            throw new Error('Erro ao cadastrar despesa.')
        }
    }

    async buscarTodasDespesas() {
        const despesas = await db.despesas.findAll({
            include: [{
                model: db.categorias_despesas,
                as: 'categorias_despesas_despesas',
                attributes: ['id','nome']
            }],
            order: [['vencimento','DESC']]
        })

        return despesas
    }

    async buscarDespesaPorId(id) {
        const despesa = await db.despesas.findOne({
            include: [{
                model: db.categorias_despesas,
                as: 'categorias_despesas_despesas',
                attributes: ['id','nome']
            }],
            where: {
                id: id
            }
        })

        if (!despesa) {
            throw new Error('Despesa informada não cadastrada.')
        }

        return despesa
    }

    async editarDespesa(dto) {
        const despesa = await this.buscarDespesaPorId(dto.id)
        
        try {
            despesa.descricao = dto.descricao,
            despesa.valor = dto.valor,
            despesa.vencimento = dto.vencimento,
            despesa.pago = dto.pago,
            despesa.valor_pago = dto.valor_pago,
            despesa.descontos = dto.descontos,
            despesa.multas_juros = dto.multas_juros,
            despesa.pagamento = dto.pagamento,
            despesa.categoria_id = dto.categoria_id

            await despesa.save()
            return despesa
        } catch (error) {
            throw new Error('Erro ao editar a despesa.')
        }
    }

    async deletarDespesa(id) {
        try {
            await db.despesas.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir a despesa')
        }
    }

    async relatorioDespesas(dto) {
        const dtInicial = dto.periodo.dataInicio.split("T")[0]
        const dtFinal = dto.periodo.dataFim.split("T")[0]
        const emAberto = dto.emAberto ? 0 : 1
        const whereCondition = {}

        if (dto.emAberto != '') {
            whereCondition.pago = emAberto
        }

        if (dto.periodo.dataInicio != '' && dto.periodo.dataFim != '') {
            whereCondition.vencimento = {
                [Op.gte]: dtInicial,
                [Op.lte]: dtFinal
            }
        }

        try {
            const despesas = await db.despesas.findAll({
                where: whereCondition,
                order: [[Sequelize.col('vencimento'), 'DESC']]
            })
    
            return despesas
        } catch (error) {
            throw new Error('Erro ao tentar buscar dados das despesas')
        }
    }
}

module.exports = DespesaService