'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class consumos_hospedagens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      consumos_hospedagens.belongsTo(models.produtos_servicos, {
        as: 'consumo_proser',
        foreignKey: 'proser_id'
      }),
      consumos_hospedagens.belongsTo(models.hospedagens, {
        as: 'consumo_hospedagem',
        foreignKey: 'hospedagem_id'
      })
    }
  }
  consumos_hospedagens.init({
    quantidade: DataTypes.INTEGER,
    datahora: DataTypes.NOW,
    proser_id: DataTypes.UUID,
    hospedagem_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'consumos_hospedagens',
  });
  return consumos_hospedagens;
};