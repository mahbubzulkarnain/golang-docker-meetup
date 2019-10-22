'use strict';
module.exports = {
  up  : async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').catch(console.log);
    return queryInterface.createTable('Events', {
      id         : {
        allowNull   : false,
        primaryKey  : true,
        type        : Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      chapterId  : {
        allowNull : true,
        type      : Sequelize.UUID,
        references: {
          key  : 'id',
          model: 'Chapters',
        },
        onUpdate  : 'cascade',
        onDelete  : 'cascade'
      },
      tagId      : {
        allowNull : true,
        type      : Sequelize.UUID,
        references: {
          key  : 'id',
          model: 'Tags',
        },
        onUpdate  : 'cascade',
        onDelete  : 'cascade'
      },
      venueId    : {
        allowNull : true,
        type      : Sequelize.UUID,
        references: {
          key  : 'id',
          model: 'Venues',
        },
        onUpdate  : 'cascade',
        onDelete  : 'cascade'
      },
      name       : {
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type     : Sequelize.TEXT
      },
      startDate  : {
        type: Sequelize.DATE
      },
      endDate    : {
        type: Sequelize.DATE
      },
      capacity   : {
        type: Sequelize.INTEGER,
      },
      createdAt  : {
        allowNull   : false,
        type        : Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt  : {
        allowNull: true,
        type     : Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};
