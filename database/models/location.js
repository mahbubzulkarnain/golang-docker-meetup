'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    city       : DataTypes.STRING,
    postalCode : DataTypes.STRING,
    region     : DataTypes.STRING,
    country    : DataTypes.STRING,
    countryCode: DataTypes.STRING
  }, {});
  Location.associate = function (models) {
    // associations can be defined here
  };
  return Location;
};
