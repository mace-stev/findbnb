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
        spotId: 1, //"App Academy"
        userId: 1,
        review: 'Amazing place to learn!',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,// "Hotel California",
        userId: 2,
        review: 'Had a wonderful stay!',
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3, //"Studio"
        userId: 3, // Assuming a user with ID 1
        review: 'Cozy and comfortable!',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
