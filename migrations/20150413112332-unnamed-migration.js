"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done();
  }
};

exports.up=function(db,callback){
db.addColumn("Users",{phone:
{type: VARCHAR(10),
isNumeric: true}, callback);
};
