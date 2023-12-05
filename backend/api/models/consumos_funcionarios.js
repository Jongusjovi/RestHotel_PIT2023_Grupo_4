'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class consumos_funcionarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      consumos_funcionarios.belongsTo(models.produtos_servicos, {
        as: 'consumo_proser',
        foreignKey: 'proser_id'
      }),
      consumos_funcionarios.belongsTo(models.funcionarios, {
        as: 'consumo_funcionario',
        foreignKey: 'funcionario_id'
      })
    }
  }
  consumos_funcionarios.init({
    quantidade: DataTypes.INTEGER,
    datahora: DataTypes.NOW,
    proser_id: DataTypes.UUID,
    funcionario_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'consumos_funcionarios',
  });
  return consumos_funcionarios;
};