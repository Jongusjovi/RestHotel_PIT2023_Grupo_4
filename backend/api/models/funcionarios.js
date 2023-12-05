'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class funcionarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      funcionarios.belongsTo(models.funcoes, {
        as: 'funcionario_funcao',
        foreignKey: 'funcao_id'
      }),
      funcionarios.hasMany(models.hospedagens, {
        foreignKey: 'funcionario_id'
      })
    }
  }
  funcionarios.init({
    cpf: DataTypes.STRING,
    nome: DataTypes.STRING,
    endereco: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    cep: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    funcao_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'funcionarios',
  });
  return funcionarios;
};