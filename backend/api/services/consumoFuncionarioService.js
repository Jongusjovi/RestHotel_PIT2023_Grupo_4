const db = require('../models')
const uuid = require('uuid')

class ConsumoFuncionarioService {
    async cadastrar(dto) {
        try {
            const novoConsumo = await db.consumos_funcionarios.create({
                id: uuid.v4(),
                quantidade: dto.quantidade,
                datahora: new Date(Date.now()),
                proser_id: dto.proser_id,
                funcionario_id: dto.funcionario_id
            })

            return novoConsumo
        } catch (error) {
            throw new Error('Erro ao cadastrar o consumo')
        }
    }

    async buscarTodosConsumos() {
        const consumos = await db.consumos_funcionarios.findAll({
            include: [
                {
                    model: db.produtos_servicos,
                    as: 'consumo_produto_servico',
                    attributes: ['id','nome', 'preco']
                },
                {
                    model: db.funcionarios,
                    as: 'consumo_funcionario',
                    attributes: ['id']
                }
            ]
        })
        return consumos
    }

    async buscarConsumoPorId(id) {
        const consumo = await db.consumos_funcionarios.findOne({
            include: [
                {
                    model: db.produtos_servicos,
                    as: 'consumo_proser',
                    attributes: ['id','nome', 'preco']
                },
                {
                    model: db.funcionarios,
                    as: 'consumo_funcionario',
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

    async buscarConsumosPorFuncionarioId(id) {
        const funcionario = await db.funcionarios.findOne({
            where: {
                id: id
            }
        })

        if (!funcionario) {
            throw new Error('Funcionário informado não cadastrado')
        }
        
        const consumos = await db.consumos_funcionarios.findAll({
            include: [
                {
                    model: db.produtos_servicos,
                    as: 'consumo_proser',
                    attributes: ['id','nome', 'preco']
                }
            ],
            where: {
                funcionario_id: id
            }
        })

        if (!consumos) {
            throw new Error('Funcionário sem consumos')
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
            await db.consumos_funcionarios.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o consumo')
        }
    }
}

module.exports = ConsumoFuncionarioService