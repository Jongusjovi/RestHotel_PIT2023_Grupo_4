const db = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

class UsuarioService {
    async cadastrar(dto) {
        const usuario = await db.usuarios.findOne({
            where: {
                email: dto.email
            }
        })

        if (usuario) {
            throw new Error('Usuário já cadastrado')
        }

        try {
            const senhaHash = await hash(dto.senha, 8)

            const novoUsuario = await db.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash,
                nivel_id: dto.nivel_id
            })

            return novoUsuario
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário')
        }
    }

    async buscarTodosUsuarios() {
        const usuarios = await db.usuarios.findAll({
            include: [{
                model: db.niveis,
                as: 'usuario_nivel',
                attributes: ['id','nome']
            }]
        })
        return usuarios
    }

    async buscarUsuarioPorId(id) {
        const usuario = await db.usuarios.findOne({
            include: [{
                model: db.niveis,
                as: 'usuario_nivel',
                attributes: ['id','nome']
            }],
            where: {
                id: id
            }
        })

        if (!usuario) {
            throw new Error('Usuário informado não cadastrado')
        }

        return usuario
    }

    async editarUsuario(dto) {
        const usuario = await this.buscarUsuarioPorId(dto.id)
        
        try {
            const senhaHash = await hash(dto.senha, 8)

            usuario.nome = dto.nome
            usuario.email = dto.email
            usuario.senha = senhaHash
            usuario.nivel_id = dto.nivel_id

            await usuario.save()
            return usuario
        } catch (error) {
            throw new Error('Erro ao editar usuário')
        }
    }

    async deletarUsuario(id) {
        await this.buscarUsuarioPorId(id)

        try {
            await db.usuarios.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o usuário')
        }
    }
}

module.exports = UsuarioService