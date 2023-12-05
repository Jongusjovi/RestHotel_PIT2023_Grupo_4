'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID
      },
      datachegada: {
        type: Sequelize.DATE
      },
      datasaida: {
        type: Sequelize.DATE
      },
      quantidade_hospedes: {
        type: Sequelize.INTEGER
      },
      cliente_id: {
        type: Sequelize.UUID,
        references: {
          model: 'clientes',
          key: 'id'
        }
      },
      quarto_id: {
        type: Sequelize.UUID,
        references: {
          model: 'quartos',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reservas');
  }
};