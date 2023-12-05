'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class despesas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      despesas.belongsTo(models.categorias_despesas, {
        as: 'categorias_despesas_despesas',
        foreignKey: 'categoria_id'
      })
    }
  }
  despesas.init({
    descricao: DataTypes.STRING,
    valor: DataTypes.DECIMAL(10,2),
    vencimento: DataTypes.DATEONLY,
    pago: DataTypes.INTEGER,
    valor_pago: DataTypes.DECIMAL(10,2),
    descontos: DataTypes.DECIMAL(10,2),
    multa_juros: DataTypes.DECIMAL(10,2),
    pagamento: DataTypes.DATEONLY,
    categoria_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'despesas',
  });
  return despesas;
};