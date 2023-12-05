const db = require('../models')
const uuid = require('uuid')

class PermissaoService {
    async cadastrar(dto) {
        const permissao = await db.permissoes.findOne({
            attributes: ["nivel_id"],
            where: {
                nivel_id: dto.nivel
            }
        })

        if (permissao) {
            throw new Error('Permissão para o nível já cadastrada')
        }

        try {
            for (const permissao of dto.permissoes) {
                for (const item_menu of permissao.itens_menus) {
                    const novaPermissao = await db.permissoes.create({
                        id: uuid.v4(),
                        nivel_id: dto.nivel,
                        menu_id: permissao.menu_id,
                        item_menu_id: item_menu
                    })
                }

                if (permissao.itens_menus.length <= 0) {
                    const novaPermissao = await db.permissoes.create({
                        id: uuid.v4(),
                        nivel_id: dto.nivel,
                        menu_id: permissao.menu_id
                    })
                }
            }
        } catch (error) {
            throw new Error('Erro ao cadastrar a permissão')
        }
    }

    async buscarTodasPermissoes() {
        const menus = await db.permissoes.findAll({
            include: [
                {
                    model: db.niveis,
                    as: 'permissao_nivel',
                    attributes: ['id', 'nome']
                },
                {
                    model: db.menus,
                    as: 'permissao_menu',
                    attributes: ['id', 'nome']
                },
                {
                    model: db.itens_menus,
                    as: 'permissao_item_menu',
                    attributes: ['id', 'nome']
                }
            ]
        })
        return menus
    }

    async buscarPermissoesPorNivelId(id) {
        const permissoes = await db.permissoes.findAll({
            include: [
                {
                    model: db.menus,
                    as: 'permissao_menu',
                    attributes: ['id', 'nome']
                },
                {
                    model: db.itens_menus,
                    as: 'permissao_item_menu',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                nivel_id: id
            }
        })

        if (!permissoes) {
            throw new Error('Nível de usuário informado não cadastrado')
        }

        return permissoes
    }

    async editarPermissoesPorNivelId(dto) {
        const nivel = await this.buscarPermissoesPorNivelId(dto.nivel)
        
        try {
            if (nivel) {
                await this.deletarPermissoesPorNivelId(dto.nivel)
                await this.cadastrar(dto)
            }
        } catch (error) {
            throw new Error('Erro ao editar as permissões de nível de usuário')
        }
    }

    async deletarPermissoesPorNivelId(id) {
        //await this.buscarMenuPorId(id)

        try {
            await db.permissoes.destroy({
                where: {
                    nivel_id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir as permissões de nível de usuário')
        }
    }
}

module.exports = PermissaoService