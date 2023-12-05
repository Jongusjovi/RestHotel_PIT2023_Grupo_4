const db = require('../models')
const uuid = require('uuid')

class QuartoTipoService {
    async cadastrar(dto) {
        const quartoTipo = await db.quartostipos.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (quartoTipo) {
            throw new Error('Tipo de quarto já cadastrado')
        }

        try {
            const novoTipoQuarto = await db.quartostipos.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao,
                valor_diaria: dto.valor_diaria
            })

            return novoTipoQuarto
        } catch (error) {
            throw new Error('Erro ao cadastrar o tipo de quarto')
        }
    }

    async buscarTodosTiposQuartos() {
        const tiposQuartos = await db.quartostipos.findAll()
        return tiposQuartos
    }

    async buscarTipoQuartoPorId(id) {
        const tipoQuarto = await db.quartostipos.findOne({
            where: {
                id: id
            }
        })

        if (!tipoQuarto) {
            throw new Error('Tipo de quarto informado não cadastrado')
        }

        return tipoQuarto
    }

    async editarTipoQuarto(dto) {
        const tipoQuarto = await this.buscarTipoQuartoPorId(dto.id)
        
        try {
            tipoQuarto.nome = dto.nome
            tipoQuarto.descricao = dto.descricao
            tipoQuarto.valor_diaria = dto.valor_diaria

            await tipoQuarto.save()
            return tipoQuarto
        } catch (error) {
            throw new Error('Erro ao editar tipo de quarto')
        }
    }

    async deletarTipoQuarto(id) {
        await this.buscarTipoQuartoPorId(id)

        try {
            await db.quartostipos.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o tipo de quarto')
        }
    }
}

module.exports = QuartoTipoService