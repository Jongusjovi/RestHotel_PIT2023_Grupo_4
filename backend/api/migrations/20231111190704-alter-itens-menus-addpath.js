'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('itens_menus', 'caminho', {
          type: Sequelize.DataTypes.STRING,
          after: "menu_id"
        }, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('itens_menus', 'caminho', { transaction: t })
      ]);
    }); 
  }
};
