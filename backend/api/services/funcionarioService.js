const { Op } = require('sequelize')
const db = require('../models')
const uuid = require('uuid')

class FuncionarioService {
    async cadastrar(dto) {
        const funcionario = await db.funcionarios.findOne({
            where: {
                cpf: dto.cpf
            }
        })

        if (funcionario) {
            throw new Error('Funcionário já cadastrado')
        }

        try {
            const novoFuncionario = await db.funcionarios.create({
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
                funcao_id: dto.funcao_id
            })

            return novoFuncionario
        } catch (error) {
            throw new Error('Erro ao cadastrar funcionário')
        }
    }

    async buscarTodosFuncionarios() {
        const funcionarios = await db.funcionarios.findAll({
            include: [{
                model: db.funcoes,
                as: 'funcionario_funcao',
                attributes: ['id','nome']
            }]
        })
        return funcionarios
    }

    async buscarFuncionarioPorId(id) {
        const funcionario = await db.funcionarios.findOne({
            include: [{
                model: db.funcoes,
                as: 'funcionario_funcao',
                attributes: ['id','nome']
            }],
            where: {
                id: id
            }
        })

        if (!funcionario) {
            throw new Error('Funcionário informado não cadastrado')
        }

        return funcionario
    }

    async buscarFuncionarioPorNome(nome) {
        const funcionarios = await db.funcionarios.findAll({
            include: [{
                model: db.funcoes,
                as: 'funcionario_funcao',
                attributes: ['id', 'nome']
            }],
            where: {
                nome: { [Op.like]: nome + "%" }
            }
        })

        return funcionarios
    }

    async editarFuncionario(dto) {
        const funcionario = await this.buscarFuncionarioPorId(dto.id)
        
        try {
            funcionario.cpf = dto.cpf,
            funcionario.nome = dto.nome,
            funcionario.endereco = dto.endereco,
            funcionario.bairro = dto.bairro,
            funcionario.cidade = dto.cidade,
            funcionario.uf = dto.uf,
            funcionario.cep = dto.cep,
            funcionario.telefone = dto.telefone,
            funcionario.email = dto.email,
            funcionario.funcao_id = dto.funcao_id

            await funcionario.save()
            return funcionario
        } catch (error) {
            throw new Error('Erro ao editar funcionário')
        }
    }

    async deletarFuncionario(id) {
        await this.buscarFuncionarioPorId(id)

        try {
            await db.funcionarios.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o funcionário')
        }
    }
}

module.exports = FuncionarioService