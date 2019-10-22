'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserBan = sequelize.define('UserBan', {
    userId   : DataTypes.STRING,
    chapterId: DataTypes.UUID
  }, {});
  UserBan.associate = function (models) {
    // associations can be defined here
  };
  return UserBan;
};
