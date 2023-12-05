'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permissoes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      nivel_id: {
        type: Sequelize.UUID,
        references: {
          model: 'niveis',
          key: 'id'
        }
      },
      menu_id: {
        type: Sequelize.UUID,
        references: {
          model: 'menus',
          key: 'id'
        }
      },
      item_menu_id: {
        type: Sequelize.UUID,
        references: {
          model: 'itens_menus',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permissoes');
  }
};