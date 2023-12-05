'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usuarios.belongsTo(models.niveis, {
        as: 'usuario_nivel',
        foreignKey: 'nivel_id'
      }),
      usuarios.hasMany(models.hospedagens, {
        foreignKey: 'usuario_id'
      })
    }
  }
  usuarios.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    nivel_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'usuarios',
    defaultScope: {
      attributes: {
        exclude: ['senha']
      }
    }
  });
  return usuarios;
};