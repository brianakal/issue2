'use strict';
module.exports = (sequelize, DataTypes) => {
  const log = sequelize.define('log', {
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {
    underscored: true,
  });
  log.associate = function(models) {
    // associations can be defined here
  };
  return log;
};