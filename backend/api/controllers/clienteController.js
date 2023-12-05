const ClienteService = require('../services/clienteService')

const clienteService = new ClienteService()

class ClienteController {
    static async cadastrar(req, res) {
        const {
            cpf, 
            nome, 
            endereco,
            bairro,
            cidade,
            uf,
            cep,
            telefone,
            email, 
            datanasc 
        } = req.body

        try {
            const cliente = await clienteService.cadastrar({
                cpf, 
                nome, 
                endereco,
                bairro,
                cidade,
                uf,
                cep,
                telefone,
                email, 
                datanasc
            })

            res.status(201).json({
                status: true,
                mensagem: 'Cliente cadastrado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosClientes(req, res) {
        const clientes = await clienteService.buscarTodosClientes()

        res.status(200).json(clientes)
    }

    static async buscarClientePorId(req, res) {
        try {
            const { id } = req.params
            const cliente = await clienteService.buscarClientePorId(id)

            res.status(200).json(cliente)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarCliente(req, res) {
        const {
            id,
            cpf, 
            nome, 
            endereco,
            bairro,
            cidade,
            uf,
            cep,
            telefone,
            email, 
            datanasc
        } = req.body

        try {
            const cliente = await clienteService.editarCliente({
                id,
                cpf, 
                nome, 
                endereco,
                bairro,
                cidade,
                uf,
                cep,
                telefone,
                email, 
                datanasc
            })
            res.status(200).json({
                status: true,
                mensagem: 'Cliente atualizado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarCliente(req, res) {
        const { id } = req.body

        try {
            await clienteService.deletarCliente(id)
            res.status(200).json({
                status: true,
                mensagem: 'Cliente excluído com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = ClienteController