'use strict';

const { Review } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,
        spotId: 1, //"App Academy"
        review: 'Amazing place to learn!',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 2,// "Hotel California",
        review: 'Had a wonderful stay!',
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3, // Assuming a user with ID 3
        spotId: 3, //"Studio"
        review: 'Cozy and comfortable!',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 3, //"Studio"
        review: 'Litty',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
