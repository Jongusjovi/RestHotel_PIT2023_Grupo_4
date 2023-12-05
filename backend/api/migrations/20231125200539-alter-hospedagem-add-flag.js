'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('hospedagens', 'ativo', {
          type: Sequelize.DataTypes.INTEGER,
          after: "cliente_id"
        }, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('hospedagens', 'ativo', { transaction: t })
      ]);
    }); 
  }
};
