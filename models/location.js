"use strict";
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    stationName: DataTypes.STRING,
    stationCode: {
      type: DataTypes.STRING,
      field: 'station_code'
    }

  }, {
    classMethods: {
      associate: function(models) {
        this.hasMany(models.User, { through: 'Users_Locations' });
      }
    }
  });
  return Location;
};