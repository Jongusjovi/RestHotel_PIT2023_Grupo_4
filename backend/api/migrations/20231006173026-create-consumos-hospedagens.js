'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('consumos_hospedagens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      datahora: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      proser_id: {
        type: Sequelize.UUID,
        references: {
          model: 'produtos_servicos',
          key: 'id'
        }
      },
      hospedagem_id: {
        type: Sequelize.UUID,
        references: {
          model: 'hospedagens',
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
    await queryInterface.dropTable('consumos_hospedagens');
  }
};