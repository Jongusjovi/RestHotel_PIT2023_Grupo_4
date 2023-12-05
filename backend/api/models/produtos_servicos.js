'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produtos_servicos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      produtos_servicos.hasMany(models.consumos_hospedagens, {
        foreignKey: 'proser_id'
      }),
      produtos_servicos.hasMany(models.consumos_funcionarios, {
        foreignKey: 'proser_id'
      })
    }
  }
  produtos_servicos.init({
    nome: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    preco: DataTypes.DECIMAL(10,2),
    tipo: DataTypes.CHAR(1)
  }, {
    sequelize,
    modelName: 'produtos_servicos',
  });
  return produtos_servicos;
};