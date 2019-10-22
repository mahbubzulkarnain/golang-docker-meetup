'use strict';
module.exports = {
  up  : (queryInterface, Sequelize) => {
    return queryInterface.createTable('Categories', {
      id       : {
        allowNull   : false,
        primaryKey  : true,
        type        : Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name     : {
        type: Sequelize.STRING
      },
      slug     : {
        unique: true,
        type  : Sequelize.STRING
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
    return queryInterface.dropTable('Categories');
  }
};
