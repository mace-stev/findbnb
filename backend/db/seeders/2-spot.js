'use strict';

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        ownerId: 2,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 34.7645358,
        lng: -122.4730327,
        name: "Hotel California",
        description: "What a lovely place",
        price: 999,
      },
      {
        ownerId: 3,
        address: "546 Walnut Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 33.7645358,
        lng: -122.4730327,
        name: "Studio",
        description: "blah blah blah",
        price: 567,
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['App Academy', 'Hotel California', 'Studio'] }
    }, {});
  }
};
