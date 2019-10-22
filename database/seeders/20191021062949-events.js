'use strict';

const records = {
  name     : "Intro Golang Programming",
  startDate: new Date(),
  endDate  : new Date(),
  capacity : 10,
};

module.exports = {
  up  : async (queryInterface, Sequelize) => {
    const [[chapter]] = await queryInterface.sequelize.query('select * from "Chapters"').catch(() => ([[{ "id": "" }]]));
    const [[tag]] = await queryInterface.sequelize.query('select * from "Tags"').catch(() => ([[{ "id": "" }]]));
    const [[venue]] = await queryInterface.sequelize.query('select * from "Venues"').catch(() => ([[{ "id": "" }]]));
    return queryInterface.bulkInsert('Events', [{
      ...records,
      chapterId: chapter.id,
      tagId    : tag.id,
      venueId  : venue.id,
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', [records], {});
  }
};
