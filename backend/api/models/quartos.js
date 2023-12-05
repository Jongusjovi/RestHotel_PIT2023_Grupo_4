'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quartos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      quartos.belongsTo(models.quartostipos, {
        as: 'quarto_tipoquarto',
        foreignKey: 'quartotipo_id'
      }),
      quartos.hasMany(models.hospedagens, {
        foreignKey: 'quarto_id'
      }),
      quartos.hasMany(models.reservas, {
        foreignKey: 'quarto_id'
      })
    }
  }
  quartos.init({
    descricao: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'quartos',
  });
  return quartos;
};