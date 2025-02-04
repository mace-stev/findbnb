'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        type: Sequelize.INTEGER,
        allownull: false
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      spotId: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
        allownull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allownull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.dropTable('Reviews');
  },
};