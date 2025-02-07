'use strict';

const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        id: 1,
        reviewId: 1,
        Url: 'https://example.com/image1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        reviewId: 1,
        Url: 'https://example.com/image2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        reviewId: 2,
        Url: 'https://example.com/image3.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
], options);
},

async down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('ReviewImages', null, options);
  }
};


