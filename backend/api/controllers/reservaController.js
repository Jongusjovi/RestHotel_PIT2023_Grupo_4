const ReservaService = require('../services/reservaService')

const reservaService = new ReservaService()

class ReservaController {
    static async cadastrar(req, res) {
        const { datachegada, datasaida, quantidade_hospedes, quarto_id, cliente_id } = req.body

        try {
            const reserva = await reservaService.cadastrar({
                datachegada, 
                datasaida, 
                quantidade_hospedes, 
                quarto_id, 
                cliente_id
            })

            res.status(201).json({
                status: true,
                mensagem: 'Reserva cadastrada com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async filtrarPeriodo(req, res) {
        const { datachegada, datasaida } = req.body

        try {
            const quartosLivres = await reservaService.filtrarPeriodo({
                datachegada,
                datasaida
            })

            res.status(200).send(quartosLivres)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodasReservas(req, res) {
        const reservas = await reservaService.buscarTodasReservas()

        res.status(200).json(reservas)
    }

    static async buscarReservaPorId(req, res) {
        try {
            const { id } = req.params
            const reserva = await reservaService.buscarReservaPorId(id)

            res.status(200).json(reserva)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarReserva(req, res) {
        const { id, datachegada, datasaida, quantidade_hospedes, quarto_id, cliente_id } = req.body

        try {
            const reserva = await reservaService.editarReserva({
                id, 
                datachegada, 
                datasaida, 
                quantidade_hospedes, 
                quarto_id, 
                cliente_id
            })
            res.status(200).json({
                status: true,
                mensagem: 'Reserva atualizada com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarReserva(req, res) {
        const { id } = req.body

        try {
            await reservaService.deletarReserva(id)
            res.status(200).json({
                status: true,
                mensagem: 'Reserva excluída com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async relatorioReservas(req, res) {

        const { dataInicio, dataFim } = req.body

        try {
            const reservas = await reservaService.relatorioReservas({ dataInicio, dataFim })

            res.status(200).json(reservas)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }

        
    }
}

module.exports = ReservaController