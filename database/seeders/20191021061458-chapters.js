'use strict';

const records = {
  name: "Cloud Eye"
};

module.exports = {
  up  : async (queryInterface, Sequelize) => {
    const [[location]] = await queryInterface.sequelize.query('select * from "Locations"').catch(() => ([[{ "id": "" }]]));
    const [[category]] = await queryInterface.sequelize.query('select * from "Categories"').catch(() => ([[{ "id": "" }]]));
    return queryInterface.bulkInsert('Chapters', [{
      ...records,
      creatorId : "Qms0jQGJJWa4rOOHnFSPrLxVtxi2",
      locationId: location.id,
      categoryId: category.id,
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chapters', [records], {});
  }
};
