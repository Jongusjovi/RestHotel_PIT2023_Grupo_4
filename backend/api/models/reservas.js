'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reservas.belongsTo(models.quartos, {
        as: 'reservas_quartos',
        foreignKey: 'quarto_id'
      }),
      reservas.belongsTo(models.clientes, {
        as: 'reservas_clientes',
        foreignKey: 'cliente_id'
      })
    }
  }
  reservas.init({
    datachegada: DataTypes.DATE,
    datasaida: DataTypes.DATE,
    quantidade_hospedes: DataTypes.INTEGER,
    cliente_id: DataTypes.UUID,
    quarto_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'reservas',
  });
  return reservas;
};