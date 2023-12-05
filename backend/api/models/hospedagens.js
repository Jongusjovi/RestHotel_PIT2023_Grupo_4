'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hospedagens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      hospedagens.belongsTo(models.quartos, {
        as: 'hospedagem_quarto',
        foreignKey: 'quarto_id'
      }),
      hospedagens.belongsTo(models.funcionarios, {
        as: 'hospedagem_funcionario',
        foreignKey: 'funcionario_id'
      }),
      hospedagens.belongsTo(models.usuarios, {
        as: 'hospedagem_usuario',
        foreignKey: 'usuario_id'
      }),
      hospedagens.belongsTo(models.clientes, {
        as: 'hospedagem_cliente',
        foreignKey: 'cliente_id'
      }),
      hospedagens.hasMany(models.consumos_hospedagens, {
        foreignKey: 'hospedagem_id'
      })
    }
  }
  hospedagens.init({
    checkin: DataTypes.DATE,
    checkout: DataTypes.DATE,
    total_consumo: DataTypes.DECIMAL,
    valor_total: DataTypes.DECIMAL,
    funcionario_id: DataTypes.UUID,
    usuario_id: DataTypes.UUID,
    quarto_id: DataTypes.UUID,
    cliente_id: DataTypes.UUID,
    ativo: DataTypes.INTEGER,
    limpeza: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hospedagens',
  });
  return hospedagens;
};