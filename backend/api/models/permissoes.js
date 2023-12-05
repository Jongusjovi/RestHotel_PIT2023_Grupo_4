'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      permissoes.belongsTo(models.niveis, {
        as: 'permissao_nivel',
        foreignKey: 'nivel_id'
      }),
      permissoes.belongsTo(models.menus, {
        as: 'permissao_menu',
        foreignKey: 'menu_id'
      }),
      permissoes.belongsTo(models.itens_menus, {
        as: 'permissao_item_menu',
        foreignKey: 'item_menu_id'
      })
    }
  }
  permissoes.init({
    nivel_id: DataTypes.UUID,
    menu_id: DataTypes.UUID,
    item_menu_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'permissoes',
  });
  return permissoes;
};