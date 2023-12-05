'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fornecedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fornecedores.init({
    cnpj: DataTypes.STRING,
    razaosocial: DataTypes.STRING,
    nomefantasia: DataTypes.STRING,
    endereco: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    cep: DataTypes.STRING,
    telefone: DataTypes.STRING,
    segmento: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fornecedores',
  });
  return fornecedores;
};