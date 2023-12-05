const db = require('../models')
const uuid = require('uuid')

class FuncaoService {
    async cadastrar(dto) {
        const funcao = await db.funcoes.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (funcao) {
            throw new Error('Função já cadastrada')
        }

        try {
            const novaFuncao = await db.funcoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return novaFuncao
        } catch (error) {
            throw new Error('Erro ao cadastrar função')
        }
    }

    async buscarTodasFuncoes() {
        const funcoes = await db.funcoes.findAll()
        return funcoes
    }

    async buscarFuncaoPorId(id) {
        const funcao = await db.funcoes.findOne({
            where: {
                id: id
            }
        })

        if (!funcao) {
            throw new Error('Função informada não cadastrada')
        }

        return funcao
    }

    async editarFuncao(dto) {
        const funcao = await this.buscarFuncaoPorId(dto.id)
        
        try {
            funcao.nome = dto.nome
            funcao.descricao = dto.descricao

            await funcao.save()
            return funcao
        } catch (error) {
            throw new Error('Erro ao editar função')
        }
    }

    async deletarFuncao(id) {
        await this.buscarFuncaoPorId(id)

        try {
            await db.funcoes.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir a função')
        }
    }
}

module.exports = FuncaoService