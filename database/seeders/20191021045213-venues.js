'use strict';

const records = { name: "Go Work" };

module.exports = {
  up  : async (queryInterface, Sequelize) => {
    const [[location]] = await queryInterface.sequelize.query('select * from "Locations"').catch(() => ([[{ "id": "" }]]));
    return queryInterface.bulkInsert('Venues', [{
      ...records,
      locationId: location.id,
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Venues', [records], {});
  }
};
