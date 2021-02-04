'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      poste: {
        allowNull: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      photo: {allowNull: true,
        type: Sequelize.STRING
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};