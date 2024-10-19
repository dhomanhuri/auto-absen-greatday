'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      auth_token: {
        type: Sequelize.STRING
      },
      empId: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      keywa: {
        type: Sequelize.STRING
      },
      clock_in: {
        type: Sequelize.STRING
      },
      clock_out: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};