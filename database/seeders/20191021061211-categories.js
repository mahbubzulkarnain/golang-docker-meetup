'use strict';

const records = [
  {
    name: "Docker",
    slug: "docker"
  }
];

module.exports = {
  up  : (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', records, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', records, {});
  }
};
