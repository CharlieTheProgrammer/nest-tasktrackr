'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id'
        },
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      projectId: {
        references: {
          model: {
            tableName: 'Projects',
          },
          key: 'id'
        },
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryId: {
        references: {
          model: {
            tableName: 'Categories',
          },
          key: 'id'
        },
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      totalSeconds: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Entries');
  },
};
