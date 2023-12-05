const conversao = require('../Funcoes/conversao')
const db = require('../models')
const uuid = require('uuid')

class ServicoService {
    async cadastrar(dto) {
        const servico = await db.produtos_servicos.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (servico) {
            throw new Error('Serviço já cadastrado')
        }

        try {
            const novoServico = await db.produtos_servicos.create({
                id: uuid.v4(),
                nome: dto.nome,
                preco: conversao.CurrencyConvert(dto.preco),
                tipo: 'S'
            })

            return novoServico
        } catch (error) {
            throw new Error('Erro ao cadastrar o serviço')
        }
    }

    async buscarTodosServicos() {
        const servicos = await db.produtos_servicos.findAll({
            where: {
                tipo: 'S'
            }
        })
        return servicos
    }

    async buscarServicoPorId(id) {
        const servico = await db.produtos_servicos.findOne({
            where: {
                id: id
            }
        })

        if (!servico) {
            throw new Error('Serviço informado não cadastrado')
        }

        return servico
    }

    async editarServico(dto) {
        const servico = await this.buscarServicoPorId(dto.id)
        
        try {
            servico.nome = dto.nome
            servico.preco = dto.preco

            await servico.save()
            return servico
        } catch (error) {
            throw new Error('Erro ao editar o serviço')
        }
    }

    async deletarServico(id) {
        await this.buscarServicoPorId(id)

        try {
            await db.produtos_servicos.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o serviço')
        }
    }
}

module.exports = ServicoService