'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
<<<<<<< HEAD
          model: "Spots",
          key: "id",
          onDelete: "CASCADE"
        }
=======
          model: {
            tableName: "Spots",
            schema: options.schema
          },
          key: "id"
        },
        onDelete: 'CASCADE',
>>>>>>> 872be6c71c9ef7432a298e230f60110272623b6d
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
<<<<<<< HEAD
          model: "Users",
          key: "id",
          onDelete: "CASCADE"
        }
=======
          model: {
            tableName: "Users",
            schema: options.schema
          },
          key: "id"
        },
        onDelete: 'CASCADE',
>>>>>>> 872be6c71c9ef7432a298e230f60110272623b6d
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    await queryInterface.dropTable('Bookings');
  },
};
