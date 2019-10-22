'use strict';
module.exports = {
  up  : (queryInterface, Sequelize) => {
    return queryInterface.createTable('Chapters', {
      id         : {
        allowNull   : false,
        primaryKey  : true,
        type        : Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      categoryId : {
        type      : Sequelize.UUID,
        references: {
          key  : 'id',
          model: 'Categories',
        },
      },
      locationId : {
        type      : Sequelize.UUID,
        references: {
          key  : 'id',
          model: 'Locations',
        },
      },
      creatorId  : {
        type: Sequelize.STRING,
      },
      name       : {
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type     : Sequelize.STRING
      },
      details    : {
        allowNull: true,
        type     : Sequelize.STRING
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
    return queryInterface.dropTable('Chapters');
  }
};
