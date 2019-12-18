'use strict';
module.exports = (sequelize, DataTypes) => {
  const pengumuman = sequelize.define('pengumuman', {
    pengumuman: DataTypes.TEXT,
    created_by: DataTypes.STRING,
    isread: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  pengumuman.associate = function(models) {
    // associations can be defined here
  };
  return pengumuman;
};