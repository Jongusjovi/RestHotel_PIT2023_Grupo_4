'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('itens_menus', 'menu_id', {
          type: Sequelize.DataTypes.UUID,
          after: "nome",
          references: {
            model: 'menus',
            key: 'id'
          }
        }, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('itens_menus', 'menu_id', { transaction: t })
      ]);
    }); 
  }
};
