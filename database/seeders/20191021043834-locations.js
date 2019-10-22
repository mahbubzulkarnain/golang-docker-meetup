'use strict';

const faker = require('faker');

const records = (new Array(20).fill()).map(() => ({
  city       : faker.address.city(),
  postalCode : faker.address.zipCode(),
  region     : faker.address.county(),
  country    : faker.address.country(),
  countryCode: faker.address.countryCode(),
}));

module.exports = {
  up  : (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Locations', records, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', records, {});
  }
};
