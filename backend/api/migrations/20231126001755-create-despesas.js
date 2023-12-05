'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('despesas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      descricao: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.DECIMAL(10,2)
      },
      vencimento: {
        type: Sequelize.DATE
      },
      pago: {
        type: Sequelize.INTEGER
      },
      valor_pago: {
        type: Sequelize.DECIMAL(10,2)
      },
      descontos: {
        type: Sequelize.DECIMAL(10,2)
      },
      multa_juros: {
        type: Sequelize.DECIMAL(10,2)
      },
      pagamento: {
        type: Sequelize.DATE
      },
      categoria_id: {
        type: Sequelize.UUID,
        references: {
          model: 'categorias_despesas',
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
    await queryInterface.dropTable('despesas');
  }
};