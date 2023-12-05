'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('hospedagens', 'limpeza', {
          type: Sequelize.DataTypes.INTEGER,
          after: "ativo"
        }, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('hospedagens', 'limpeza', { transaction: t })
      ]);
    }); 
  }
};
