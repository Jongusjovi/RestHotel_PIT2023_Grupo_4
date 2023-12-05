'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      clientes.hasMany(models.hospedagens, {
        foreignKey: 'cliente_id'
      }),
      clientes.hasMany(models.reservas, {
        foreignKey: 'cliente_id'
      })
    }
  }
  clientes.init({
    cpf: DataTypes.STRING,
    nome: DataTypes.STRING,
    endereco: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    cep: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    datanasc: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'clientes',
  });
  return clientes;
};