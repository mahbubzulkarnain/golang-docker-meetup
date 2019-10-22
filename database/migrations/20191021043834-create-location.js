'use strict';
module.exports = {
  up  : async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').catch(console.log);
    return queryInterface.createTable('Locations', {
      id         : {
        allowNull   : false,
        primaryKey  : true,
        type        : Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      city       : {
        type: Sequelize.STRING
      },
      postalCode : {
        type: Sequelize.STRING
      },
      region     : {
        type: Sequelize.STRING
      },
      country    : {
        type: Sequelize.STRING
      },
      countryCode: {
        allowNull: true,
        type     : Sequelize.STRING
      },
      latitude   : {
        allowNull   : true,
        type        : Sequelize.DataTypes.FLOAT,
        defaultValue: 0,
      },
      longitude  : {
        allowNull   : true,
        type        : Sequelize.DataTypes.FLOAT,
        defaultValue: 0,
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
    return queryInterface.dropTable('Locations');
  }
};
