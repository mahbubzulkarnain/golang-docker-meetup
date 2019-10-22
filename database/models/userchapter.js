'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserChapter = sequelize.define('UserChapter', {
    userId   : DataTypes.STRING,
    chapterId: DataTypes.UUID
  }, {});
  UserChapter.associate = function (models) {
    // associations can be defined here
  };
  return UserChapter;
};
