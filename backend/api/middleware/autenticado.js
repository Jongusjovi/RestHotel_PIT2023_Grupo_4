const { verify, decode } = require('jsonwebtoken')
const jsonSecrect = require('../config/jsonSecret')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send('Access token não informado')
    }

    const [, accessToken] = token.split(' ')

    try {
        verify(accessToken, jsonSecrect.secret)

        const { id, email } = await decode(accessToken)

        req.usuarioId = id
        req.usuarioEmail = email

        return next()
    } catch (error) {
        res.status(401).send('Usuário não autorizado')
    }
}