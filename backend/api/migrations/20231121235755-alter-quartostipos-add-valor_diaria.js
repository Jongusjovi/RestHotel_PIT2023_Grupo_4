'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('quartostipos', 'valor_diaria', {
          type: Sequelize.DataTypes.DECIMAL(10,2),
          after: "descricao"
        }, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('quartostipos', 'valor_diaria', { transaction: t })
      ]);
    }); 
  }
};
