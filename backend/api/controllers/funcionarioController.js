const FuncionarioService = require('../services/funcionarioService')

const funcionarioService = new FuncionarioService()

class FuncionarioController {
    static async cadastrar(req, res) {
        const {
            cpf, 
            nome, 
            endereco,
            bairro,
            cidade,
            uf,
            cep,
            telefone,
            email, 
            funcao_id 
        } = req.body

        try {
            const funcionario = await funcionarioService.cadastrar({
                cpf, 
                nome, 
                endereco,
                bairro,
                cidade,
                uf,
                cep,
                telefone,
                email, 
                funcao_id
            })

            res.status(201).json({
                status: true,
                mensagem: 'Funcionário cadastrado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosFuncionarios(req, res) {
        const funcionarios = await funcionarioService.buscarTodosFuncionarios()

        res.status(200).json(funcionarios)
    }

    static async buscarFuncionarioPorId(req, res) {
        try {
            const { id } = req.params
            const funcionario = await funcionarioService.buscarFuncionarioPorId(id)

            res.status(200).json(funcionario)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarFuncionarioPorNome(req, res) {
        try {
            const { nome } = req.body
            const funcionarios = await funcionarioService.buscarFuncionarioPorNome(nome)

            res.status(200).json(funcionarios)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarFuncionario(req, res) {
        const {
            id,
            cpf, 
            nome, 
            endereco,
            bairro,
            cidade,
            uf,
            cep,
            telefone,
            email, 
            funcao_id
        } = req.body

        try {
            const funcionario = await funcionarioService.editarFuncionario({
                id,
                cpf, 
                nome, 
                endereco,
                bairro,
                cidade,
                uf,
                cep,
                telefone,
                email, 
                funcao_id
            })
            res.status(200).json({
                status: true,
                mensagem: 'Funcionário atualizado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarFuncionario(req, res) {
        const { id } = req.body

        try {
            await funcionarioService.deletarFuncionario(id)
            res.status(200).json({
                status: true,
                mensagem: 'Funcionário excluído com sucesso!'
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = FuncionarioController