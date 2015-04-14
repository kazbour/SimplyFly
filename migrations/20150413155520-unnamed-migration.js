"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
      	migration.addColumn(
  		"Users",
  		"phone",
  		DataTypes.STRING
  		);
    // add altering commands here, calling 'done' when finished
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done();
  }
};
