'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('fornecedores', 'cep', {
          type: Sequelize.DataTypes.STRING,
          after: "uf"
        }, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('fornecedores', 'cep', { transaction: t })
      ]);
    }); 
  }
};
