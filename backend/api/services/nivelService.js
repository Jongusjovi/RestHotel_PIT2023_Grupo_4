const { Op, Sequelize } = require('sequelize')
const db = require('../models')
const uuid = require('uuid')

class NivelService {
    async cadastrar(dto) {
        const nivel = await db.niveis.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (nivel) {
            throw new Error('Nível já cadastrado')
        }

        try {
            const novoNivel = await db.niveis.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return novoNivel
        } catch (error) {
            throw new Error('Erro ao cadastrar nível')
        }
    }

    async buscarTodosNiveis() {
        const niveis = await db.niveis.findAll()
        return niveis
    }

    async buscarTodosNiveisSemPermissoes() {
        const permissoes = (await db.permissoes.findAll({
            attributes: ['nivel_id']
        })).map(permissao => permissao.nivel_id)

        const niveis = await db.niveis.findAll({
            where: {
                id: {
                    [Op.notIn]: permissoes
                }
            }
        })

        return niveis
    }

    async buscarTodosNiveisComPermissoes() {
        const permissoes = (await db.permissoes.findAll({
            attributes: ['nivel_id']
        })).map(permissao => permissao.nivel_id)

        const niveis = await db.niveis.findAll({
            where: {
                id: {
                    [Op.in]: permissoes
                }
            }
        })

        return niveis
    }

    async buscarNivelPorId(id) {
        const nivel = await db.niveis.findOne({
            where: {
                id: id
            }
        })

        if (!nivel) {
            throw new Error('Nível informado não cadastrado')
        }

        return nivel
    }

    async buscarPermissoesPorNivelId(id) {
        const permissoes = await db.niveis.findOne({
            include: [
                {
                    model: db.permissoes,
                    attributes: ['id'],
                    include: [
                        {
                            model: db.itens_menus,
                            as: 'permissao_item_menu',
                            attributes: ['id', 'nome', 'caminho'],
                            include: [
                                {
                                    model: db.menus,
                                    as: 'item_menu_menus',
                                    attributes: ['id', 'nome', 'caminho']
                                }
                            ]
                        }
                    ]
                }
            ],
            where: {
                id: id
            }
        })

        if (!permissoes) {
            throw new Error('Permissões não cadastradas para o nível informado')
        }

        return permissoes
    }

    async buscarPermissoesMenusPorNivelId(id) {
        const permissoes = await db.permissoes.findAll({
            include: [
                {
                    model: db.menus,
                    as: 'permissao_menu',
                    attributes: ['id', 'nome', 'caminho']
                }
            ],
            where: {
                nivel_id: id
            },
            group: ['menu_id']
        })

        if (!permissoes) {
            throw new Error('Permissões não cadastradas para o nível informado')
        }

        return permissoes
    }

    async buscarPermissoesSubMenusPorNivelId(id) {
        const permissoes = await db.permissoes.findAll({
            include: [
                {
                    model: db.itens_menus,
                    as: 'permissao_item_menu',
                    attributes: ['id', 'nome', 'caminho'],
                    include: [
                        {
                            model: db.menus,
                            as: 'item_menu_menus',
                            attributes: ['id', 'nome']
                        }
                    ]
                }
            ],
            where: {
                nivel_id: id
            },
            order: [[Sequelize.col('permissao_item_menu.nome'),'ASC']]
        })

        if (!permissoes) {
            throw new Error('Permissões não cadastradas para o nível informado')
        }

        return permissoes
    }


    async editarNivel(dto) {
        const nivel = await this.buscarNivelPorId(dto.id)
        
        try {
            nivel.nome = dto.nome
            nivel.descricao = dto.descricao

            await nivel.save()
            return nivel
        } catch (error) {
            throw new Error('Erro ao editar nível')
        }
    }

    async deletarNivel(id) {
        await this.buscarNivelPorId(id)

        try {
            await db.niveis.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o nível')
        }
    }
}

module.exports = NivelService