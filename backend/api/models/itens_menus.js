'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class itens_menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      itens_menus.hasMany(models.permissoes, {
        foreignKey: 'item_menu_id'
      }),
      itens_menus.belongsTo(models.menus, {
        as: 'item_menu_menus',
        foreignKey: 'menu_id'
      })
    }
  }
  itens_menus.init({
    nome: DataTypes.STRING,
    menu_id: DataTypes.UUID,
    caminho: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'itens_menus',
  });
  return itens_menus;
};