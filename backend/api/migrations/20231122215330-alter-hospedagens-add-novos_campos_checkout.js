'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('hospedagens', 'valor_total', {
          type: Sequelize.DataTypes.DECIMAL(10,2),
          after: "total_consumo"
        }, { transaction: t }),
        queryInterface.addColumn('hospedagens', 'funcionario_id', {
          type: Sequelize.DataTypes.UUID,
          after: "valor_total",
          references: {
            model: 'funcionarios',
            key: 'id'
          }
        }, { transaction: t }),
        queryInterface.addColumn('hospedagens', 'usuario_id', {
          type: Sequelize.DataTypes.UUID,
          after: "funcionario_id",
          references: {
            model: 'usuarios',
            key: 'id'
          }
        }, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('hospedagens', 'valor_total', { transaction: t }),
        queryInterface.removeColumn('hospedagens', 'funcionario_id', { transaction: t }),
        queryInterface.removeColumn('hospedagens', 'usuario_id', { transaction: t })
      ]);
    }); 
  }
};
