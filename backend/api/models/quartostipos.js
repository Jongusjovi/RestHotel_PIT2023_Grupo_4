'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quartostipos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      quartostipos.hasMany(models.quartos, {
        foreignKey: 'quartotipo_id'
      })
    }
  }
  quartostipos.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    valor_diaria: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    modelName: 'quartostipos',
  });
  return quartostipos;
};