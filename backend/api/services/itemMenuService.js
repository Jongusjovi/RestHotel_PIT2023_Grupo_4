const db = require('../models')
const uuid = require('uuid')

class ItemMenuService {
    async cadastrar(dto) {
        const itemMenu = await db.itens_menus.findOne({
            where: {
                caminho: dto.caminho
            }
        })

        if (itemMenu) {
            throw new Error('Item de Menu já cadastrado')
        }

        try {
            const novoItem = await db.itens_menus.create({
                id: uuid.v4(),
                nome: dto.nome,
                menu_id: dto.menu_id,
                caminho: dto.caminho
            })

            return novoItem
        } catch (error) {
            throw new Error('Erro ao cadastrar item de menu')
        }
    }

    async buscarTodosItens() {
        const itensMenus = await db.itens_menus.findAll()
        return itensMenus
    }

    async buscarItemMenuPorId(id) {
        const itemMenu = await db.itens_menus.findOne({
            where: {
                id: id
            }
        })

        if (!itemMenu) {
            throw new Error('Item de Menu informado não cadastrado')
        }

        return itemMenu
    }

    async editarItemMenu(dto) {
        const itemMenu = await this.buscarItemMenuPorId(dto.id)
        
        try {
            itemMenu.nome = dto.nome
            itemMenu.menu_id = dto.menu_id
            itemMenu.caminho = dto.caminho

            await itemMenu.save()
            return itemMenu
        } catch (error) {
            throw new Error('Erro ao editar item de menu')
        }
    }

    async deletarItemMenu(id) {
        await this.buscarItemMenuPorId(id)

        try {
            await db.itens_menus.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o item de menu')
        }
    }
}

module.exports = ItemMenuService