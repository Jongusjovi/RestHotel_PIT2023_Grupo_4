'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hospedagens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID
      },
      checkin: {
        type: Sequelize.DATE
      },
      checkout: {
        type: Sequelize.DATE
      },
      total_consumo: {
        type: Sequelize.DECIMAL(10,2)
      },
      quarto_id: {
        type: Sequelize.UUID,
        references: {
          model: 'quartos',
          key: 'id'
        }
      },
      cliente_id: {
        type: Sequelize.UUID,
        references: {
          model: 'clientes',
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
    await queryInterface.dropTable('hospedagens');
  }
};