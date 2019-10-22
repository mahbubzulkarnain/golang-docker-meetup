'use strict';
module.exports = {
  up  : async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').catch(console.log);
    return queryInterface.createTable('RSVPs', {
      id        : {
        allowNull   : false,
        primaryKey  : true,
        type        : Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId    : {
        type: Sequelize.STRING
      },
      eventId   : {
        type      : Sequelize.UUID,
        references: {
          key  : 'id',
          model: 'Events',
        },
      },
      date      : {
        type: Sequelize.DATE
      },
      onWaitlist: {
        type        : Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt : {
        allowNull   : false,
        type        : Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt : {
        allowNull: true,
        type     : Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RSVPs');
  }
};
