'use strict';
module.exports = (sequelize, DataTypes) => {
  const RSVP = sequelize.define('RSVP', {
    userId    : DataTypes.STRING,
    eventId   : DataTypes.UUID,
    date      : DataTypes.DATE,
    onWaitlist: DataTypes.BOOLEAN
  }, {});
  RSVP.associate = function (models) {
    // associations can be defined here
  };
  return RSVP;
};
