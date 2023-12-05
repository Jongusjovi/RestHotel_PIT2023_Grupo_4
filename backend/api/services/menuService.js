const db = require('../models')
const uuid = require('uuid')

class MenuService {
    async cadastrar(dto) {
        const menu = await db.menus.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (menu) {
            throw new Error('Menu já cadastrado')
        }

        try {
            const novoMenu = await db.menus.create({
                id: uuid.v4(),
                nome: dto.nome,
                caminho: dto.caminho
            })

            return novoMenu
        } catch (error) {
            throw new Error('Erro ao cadastrar menu')
        }
    }

    async buscarTodosMenus() {
        const menus = await db.menus.findAll({
            include: [
                {
                    model: db.itens_menus,
                    attributes: ['id', 'nome', 'caminho']
                }
            ]
        })
        return menus
    }

    async buscarMenuPorId(id) {
        const menu = await db.menus.findOne({
            where: {
                id: id
            }
        })

        if (!menu) {
            throw new Error('Menu informado não cadastrado')
        }

        return menu
    }

    async editarMenu(dto) {
        const menu = await this.buscarMenuPorId(dto.id)
        
        try {
            menu.nome = dto.nome,
            menu.caminho = dto.caminho

            await menu.save()
            return menu
        } catch (error) {
            throw new Error('Erro ao editar o menu')
        }
    }

    async deletarMenu(id) {
        await this.buscarMenuPorId(id)

        try {
            await db.menus.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o menu')
        }
    }
}

module.exports = MenuService