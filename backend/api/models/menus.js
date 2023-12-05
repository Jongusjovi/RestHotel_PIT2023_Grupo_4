'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      menus.hasMany(models.permissoes, {
        foreignKey: 'menu_id'
      }),
      menus.hasMany(models.itens_menus, {
        foreignKey: 'menu_id'
      })
    }
  }
  menus.init({
    nome: DataTypes.STRING,
    caminho: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'menus',
  });
  return menus;
};