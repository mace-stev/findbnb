'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReviewImages', {
      id: {
<<<<<<< HEAD
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allownull: false
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allownull: false,
        references: {
          model: "Reviews",
          key: "id",
          onDelete: "CASCADE"
        }
=======
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Reviews",  
            schema: options.schema  
          },
          key: "id"
        },
        onDelete: 'CASCADE',
>>>>>>> 872be6c71c9ef7432a298e230f60110272623b6d
      },
      url: {
        type: Sequelize.STRING,
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
    options.tableName = 'ReviewImages';
    await queryInterface.dropTable('ReviewImages');
  },
};