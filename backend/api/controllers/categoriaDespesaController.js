const CategoriaDespesaService = require('../services/categoriaDespesaService')

const categoriaDespesaService = new CategoriaDespesaService()

class CategoriaDespesaController {
    static async cadastrar(req, res) {
        const { nome } = req.body

        try {
            const categoria = await categoriaDespesaService.cadastrar({ nome })

            res.status(201).json({
                status: true,
                mensagem: 'Categoria de despesa cadastrada com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodasCategorias(req, res) {
        const categorias = await categoriaDespesaService.buscarTodasCategorias()

        res.status(200).json(categorias)
    }

    static async buscarCategoriaPorId(req, res) {
        try {
            const { id } = req.params
            const categoria = await categoriaDespesaService.buscarCategoriaPorId(id)

            res.status(200).json(categoria)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarCategoria(req, res) {
        const { id, nome } = req.body

        try {
            const categoria = await categoriaDespesaService.editarCategoria({ id, nome })
            res.status(200).json({
                status: true,
                mensagem: 'Categoria de despesa atualizada com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarCategoria(req, res) {
        const { id } = req.body

        try {
            await categoriaDespesaService.deletarCategoria(id)
            res.status(200).json({
                status: true,
                mensagem: 'Categoria de despesa excluída com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = CategoriaDespesaController