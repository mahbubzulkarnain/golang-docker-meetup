'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define('Chapter', {
    name       : DataTypes.STRING,
    description: DataTypes.STRING,
    categoryId : DataTypes.UUID,
    details    : DataTypes.STRING,
    locationId : DataTypes.STRING,
    creatorId  : DataTypes.STRING
  }, {});
  Chapter.associate = function (models) {
    // associations can be defined here
  };
  return Chapter;
};
