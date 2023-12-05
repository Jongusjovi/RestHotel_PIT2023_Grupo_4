const db = require('../models')
const uuid = require('uuid')

class FornecedorService {
    async cadastrar(dto) {
        const fornecedor = await db.fornecedores.findOne({
            where: {
                cnpj: dto.cnpj
            }
        })

        if (fornecedor) {
            throw new Error('Fornecedor já cadastrado')
        }

        try {
            const novoFornecedor = await db.fornecedores.create({
                id: uuid.v4(),
                cnpj: dto.cnpj,
                razaosocial: dto.razaosocial,
                nomefantasia: dto.nomefantasia,
                endereco: dto.endereco,
                bairro: dto.bairro,
                cidade: dto.cidade,
                uf: dto.uf,
                cep: dto.cep,
                telefone: dto.telefone,
                segmento: dto.segmento,
                email: dto.email
            })

            return novoFornecedor
        } catch (error) {
            throw new Error('Erro ao cadastrar fornecedor')
        }
    }

    async buscarTodosFornecedores() {
        const fornecedores = await db.fornecedores.findAll()
        return fornecedores
    }

    async buscarFornecedorPorId(id) {
        const fornecedor = await db.fornecedores.findOne({
            where: {
                id: id
            }
        })

        if (!fornecedor) {
            throw new Error('Fornecedor informado não cadastrado')
        }

        return fornecedor
    }

    async editarFornecedor(dto) {
        const fornecedor = await this.buscarFornecedorPorId(dto.id)
        
        try {
            fornecedor.cnpj = dto.cnpj
            fornecedor.razaosocial = dto.razaosocial
            fornecedor.nomefantasia = dto.nomefantasia
            fornecedor.endereco = dto.endereco
            fornecedor.bairro = dto.bairro
            fornecedor.cidade = dto.cidade
            fornecedor.uf = dto.uf
            fornecedor.cep = dto.cep
            fornecedor.telefone = dto.telefone
            fornecedor.segmento = dto.segmento
            fornecedor.email = dto.email

            await fornecedor.save()
            return fornecedor
        } catch (error) {
            throw new Error('Erro ao editar fornecedor')
        }
    }

    async deletarFornecedor(id) {
        await this.buscarFornecedorPorId(id)

        try {
            await db.fornecedores.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar excluir o fornecedor')
        }
    }
}

module.exports = FornecedorService