'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class niveis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      niveis.hasMany(models.usuarios, {
        foreignKey: 'nivel_id'
      }),
      niveis.hasMany(models.permissoes, {
        foreignKey: 'nivel_id'
      })
    }
  }
  niveis.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'niveis',
  });
  return niveis;
};