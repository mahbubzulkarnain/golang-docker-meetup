'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name       : DataTypes.STRING,
    description: DataTypes.TEXT,
    startDate  : DataTypes.DATE,
    endDate    : DataTypes.DATE,
    capacity   : DataTypes.NUMBER
  }, {});
  Event.associate = function (models) {
    // associations can be defined here
  };
  return Event;
};
