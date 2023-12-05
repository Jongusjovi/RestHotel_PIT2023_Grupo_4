const db = require('../models')
const uuid = require('uuid')
const QuartoService = require('../services/quartoService')
const { Sequelize, literal, Op } = require('sequelize')

class HospedagemService {
    async cadastrar(dto) {
        try {
            const novaHospedagem = await db.hospedagens.create({
                id: uuid.v4(),
                checkin: dto.checkin,
                quarto_id: dto.quarto_id,
                cliente_id: dto.cliente_id,
                ativo: 1,
                limpeza: 0
            })

            const quarto = await db.quartos.findOne({
                where: {
                    id: dto.quarto_id
                }
            })

            quarto.estado = 1
            await quarto.save()

            return novaHospedagem
        } catch (error) {
            throw new Error('Erro ao cadastrar hospedagem')
        }
    }

    async buscarTodasHospedagens() {
        const hospedagens = await db.hospedagens.findAll({
            include: [
                {
                    model: db.quartos,
                    as: 'hospedagem_quarto',
                    attributes: ['id','numero', 'estado'],
                    include: [{
                        model: db.quartostipos,
                        as: 'quarto_tipoquarto',
                        attributes: ['id', 'nome', 'valor_diaria']
                    }],
                    where: {
                        estado: {
                            [Op.in]: [1, 2]
                        }
                    }
                },
                {
                    model: db.clientes,
                    as: 'hospedagem_cliente',
                    attributes: ['id', 'nome', 'cpf', 'email', 'telefone']
                }
            ]
        })
        return hospedagens
    }

    async buscarHospedagemPorId(id) {
        const hospedagem = await db.hospedagens.findOne({
            include: [
                {
                    model: db.quartos,
                    as: 'hospedagem_quarto',
                    attributes: ['id','numero']
                },
                {
                    model: db.clientes,
                    as: 'hospedagem_cliente',
                    attributes: ['id', 'nome', 'cpf']
                }
            ],
            where: {
                id: id
            }
        })

        if (!hospedagem) {
            throw new Error('Hospedagem informada não cadastrada')
        }

        return hospedagem
    }

    async editarHospedagem(dto) {
        const hospedagem = await this.buscarHospedagemPorId(dto.id)
        
        try {
            hospedagem.checkin = dto.checkin
            hospedagem.checkout = dto.checkout
            hospedagem.total_consumo = dto.total_consumo
            hospedagem.quarto_id = dto.quarto_id
            hospedagem.cliente_id = dto.cliente_id

            await hospedagem.save()
            return hospedagem
        } catch (error) {
            throw new Error('Erro ao editar hospedagem')
        }
    }
    
    async removerLimpeza(dto) {
        const hospedagem = await this.buscarHospedagemPorId(dto.hospedagem_id)
        
        try {
            hospedagem.limpeza = 0

            await hospedagem.save()
            return hospedagem
        } catch (error) {
            throw new Error('Erro ao editar hospedagem')
        }
    }

    async deletarHospedagem(id) {
        await this.buscarHospedagemPorId(id)

        try {
            await db.hospedagens.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir a hospedagem')
        }
    }

    async atualizarSubTotalConsumosProdutos(id) {
        const consumos = await db.consumos_hospedagens.findAll({
            attributes: [[Sequelize.fn('sum', literal('consumos_hospedagens.quantidade * consumo_proser.preco')), 'subtotal']],
            include: [
                {
                    model: db.produtos_servicos,
                    as: 'consumo_proser',
                    attributes: ['id','preco']
                }
            ],
            where: {
                hospedagem_id : id
            }
        })

        const hospedagem = await this.buscarHospedagemPorId(id)
        
        try {
            hospedagem.total_consumo = consumos[0].dataValues.subtotal

            await hospedagem.save()
            return hospedagem
        } catch (error) {
            throw new Error('Erro ao atualizar subtotal da hospedagem')
        }
    }

    async checkout(dto) {
        const hospedagem = await this.buscarHospedagemPorId(dto.id)
        const quartoService = new QuartoService()
        const quarto = await quartoService.buscarQuartoPorId(dto.quarto_id)
        
        try {
            hospedagem.checkout = dto.checkout
            hospedagem.total_consumo = dto.total_consumo
            hospedagem.valor_total = dto.valor_total
            hospedagem.funcionario_id = dto.funcionario_id
            hospedagem.ativo = 0,
            hospedagem.limpeza = 1

            await hospedagem.save()

            quarto.estado = 2

            await quarto.save()

            return hospedagem
        } catch (error) {
            throw new Error('Erro ao realizar o checkout.')
        }
    }

    async relatorioHospedagens(dto) {
        const dtInicial = dto.dataInicio.split("T")[0] + ' 00:00:00'
        const dtFinal = dto.dataFim.split("T")[0] + ' 23:59:59'

        const whereCondition = {
            ativo: 0,
        }

        if (dto.dataInicio != '') {
            whereCondition.checkout = {
                [Op.gte]: dtInicial,
                [Op.lte]: dtFinal
            }
        }

        const hospedagens = await db.hospedagens.findAll({
            include: [
                {
                    model: db.quartos,
                    as: 'hospedagem_quarto',
                    attributes: ['id','numero', 'estado'],
                    include: [{
                        model: db.quartostipos,
                        as: 'quarto_tipoquarto',
                        attributes: ['id', 'nome', 'valor_diaria']
                    }]
                },
                {
                    model: db.clientes,
                    as: 'hospedagem_cliente',
                    attributes: ['id', 'nome', 'cpf', 'email', 'telefone']
                }
            ],
            where: whereCondition,
        })
        return hospedagens
    }
}

module.exports = HospedagemService