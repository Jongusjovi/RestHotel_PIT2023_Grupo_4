const db = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jsonSecrect = require('../config/jsonSecret')

class AuthService {
    async login(dto) {
        const usuario = await db.usuarios.findOne({
            attributes: ['id', 'email', 'senha', 'nivel_id'],
            where: {
                email: dto.email
            }
        })

        const nivelUsuario = usuario.nivel_id

        if (!usuario) {
            throw new Error('Usuário não cadastrado')
        }

        const senhasIguais = await compare(dto.senha, usuario.senha)

        if (!senhasIguais) {
            throw new Error('Usuário ou senha inválido')
        }

        const accessToken = sign({
            id: usuario.id,
            email: usuario.email
        }, jsonSecrect.secret, {
            expiresIn: 1800
        })

        return { accessToken, nivelUsuario }
    }
}

module.exports = AuthService