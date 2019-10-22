'use strict';
module.exports = {
  up  : async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').catch(console.log);
    return queryInterface.createTable('UserBans', {
      id       : {
        allowNull   : false,
        primaryKey  : true,
        type        : Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId   : {
        type: Sequelize.STRING
      },
      chapterId: {
        type      : Sequelize.UUID,
        references: {
          key  : 'id',
          model: 'Chapters',
        },
      },
      createdAt: {
        allowNull   : false,
        type        : Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: true,
        type     : Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserBans');
  }
};
