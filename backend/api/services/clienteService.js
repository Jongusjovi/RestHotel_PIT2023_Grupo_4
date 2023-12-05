const db = require('../models')
const uuid = require('uuid')

class ClienteService {
    async cadastrar(dto) {
        const cliente = await db.clientes.findOne({
            where: {
                cpf: dto.cpf
            }
        })

        if (cliente) {
            throw new Error('Cliente já cadastrado')
        }

        try {
            const novoCliente = await db.clientes.create({
                id: uuid.v4(),
                cpf: dto.cpf,
                nome: dto.nome,
                endereco: dto.endereco,
                bairro: dto.bairro,
                cidade: dto.cidade,
                uf: dto.uf,
                cep: dto.cep,
                telefone: dto.telefone,
                email: dto.email,
                datanasc: dto.datanasc
            })

            return novoCliente
        } catch (error) {
            throw new Error('Erro ao cadastrar cliente')
        }
    }

    async buscarTodosClientes() {
        const clientes = await db.clientes.findAll()
        return clientes
    }

    async buscarClientePorId(id) {
        const cliente = await db.clientes.findOne({
            where: {
                id: id
            }
        })

        if (!cliente) {
            throw new Error('Cliente informado não cadastrado')
        }

        return cliente
    }

    async editarCliente(dto) {
        const cliente = await this.buscarClientePorId(dto.id)
        
        try {
            cliente.cpf = dto.cpf
            cliente.nome = dto.nome
            cliente.endereco = dto.endereco
            cliente.bairro = dto.bairro
            cliente.cidade = dto.cidade
            cliente.uf = dto.uf
            cliente.cep = dto.cep
            cliente.telefone = dto.telefone
            cliente.email = dto.email
            cliente.datanasc = dto.datanasc

            await cliente.save()
            return cliente
        } catch (error) {
            throw new Error('Erro ao editar cliente')
        }
    }

    async deletarCliente(id) {
        await this.buscarClientePorId(id)

        try {
            await db.clientes.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o cliente')
        }
    }
}

module.exports = ClienteService