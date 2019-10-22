'use strict';

const records = [
  { name: 'Docker', },
  { name: 'Kubernetes', },
  { name: 'Microservices', },
  { name: 'Serverless', },
];

module.exports = {
  up  : (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', records, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', records, {});
  }
};
