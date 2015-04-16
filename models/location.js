"use strict";
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    station: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        this.hasMany(models.User);
      }
    }
  });
  return Location;
};