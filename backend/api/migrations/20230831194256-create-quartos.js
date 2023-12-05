'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quartos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID
      },
      descricao: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      quartotipo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'quartostipos',
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
    await queryInterface.dropTable('quartos');
  }
};