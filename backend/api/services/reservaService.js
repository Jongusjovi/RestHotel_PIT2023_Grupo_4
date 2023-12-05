const db = require('../models')
const uuid = require('uuid')
const { Sequelize, literal, Op } = require('sequelize')

class ReservaService {
    async cadastrar(dto) {
        try {
            const novaReserva = await db.reservas.create({
                id: uuid.v4(),
                datachegada: dto.datachegada,
                datasaida: dto.datasaida,
                quantidade_hospedes: dto.quantidade_hospedes,
                quarto_id: dto.quarto_id,
                cliente_id: dto.cliente_id
            })

            return novaReserva
        } catch (error) {
            throw new Error('Erro ao incluir reserva')
        }
    }

    async filtrarPeriodo(dto) {
        try {
            const quartosLivres = await db.quartos.findAll({
                include: [
                    {
                        model: db.reservas
                    },
                    {
                        model: db.quartostipos,
                        as: 'quarto_tipoquarto',
                        attributes: ['id', 'nome']
                    }
                ],
                where: literal('(reservas.datachegada is null or reservas.datasaida < "' + dto.datachegada + '") or (reservas.datasaida is null or reservas.datachegada > "' + dto.datasaida + '")'),
                required: false,
                order: [['numero','ASC']]
            })

            return quartosLivres
        } catch (error) {
            throw new Error('Erro ao filtrar o período informado')
        }
    }

    async buscarTodasReservas() {
        const reservas = await db.reservas.findAll({
            include: [
                {
                    model: db.quartos,
                    as: 'reservas_quartos',
                    attributes: ['id','numero', 'estado'],
                    include: [{
                        model: db.quartostipos,
                        as: 'quarto_tipoquarto',
                        attributes: ['id', 'nome']
                    }]
                },
                {
                    model: db.clientes,
                    as: 'reservas_clientes',
                    attributes: ['id', 'nome', 'cpf', 'telefone', 'email']
                }
            ]
        })
        return reservas
    }

    async buscarReservaPorId(id) {
        
        if (!reserva) {
            throw new Error('Reserva informada não cadastrada')
        }

        return reserva
    }

    async editarReserva(dto) {
        const reserva = await this.buscarReservaPorId(dto.id)
        
        try {
            reserva.datachegada = dto.datachegada
            reserva.datasaida = dto.datasaida
            reserva.quantidade_hospedes = dto.quantidade_hospedes
            reserva.quarto_id = dto.quarto_id
            reserva.cliente_id = dto.cliente_id

            await reserva.save()
            return reserva
        } catch (error) {
            throw new Error('Erro ao editar reserva')
        }
    }

    async deletarReserva(id) {
        try {
            await db.reservas.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir a reserva')
        }
    }

    async relatorioReservas(dto) {
        const dtInicial = dto.dataInicio.split("T")[0] + ' 00:00:00'
        const dtFinal = dto.dataFim.split("T")[0] + ' 23:59:59'

        const whereCondition = {}

        if (dto.dataInicio != '') {
            whereCondition.datachegada = {
                [Op.gte]: dtInicial
            }
        }

        if (dto.dataFim != '') {
            whereCondition.datasaida = {
                [Op.lte]: dtFinal
            }
        }

        const reservas = await db.reservas.findAll({
            include: [
                {
                    model: db.quartos,
                    as: 'reservas_quartos',
                    attributes: ['id','numero'],
                    include: [{
                        model: db.quartostipos,
                        as: 'quarto_tipoquarto',
                        attributes: ['id', 'nome']
                    }]
                },
                {
                    model: db.clientes,
                    as: 'reservas_clientes',
                    attributes: ['id', 'nome', 'cpf', 'telefone']
                }
            ],
            where: whereCondition,
        })
        return reservas
    }
}

module.exports = ReservaService