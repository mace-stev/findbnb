'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          Key: "id",
          onDelete: "CASACADE"

        }
      },
      spotId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Spots",
          Key: "id",
          onDelete: "CASCADE"

        }
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: false,
        
        },
      stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
