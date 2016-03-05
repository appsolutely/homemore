var config = require('../knexfile.js');
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);

module.exports = knex;

//runs latest migration (if any) to update the database
knex.migrate.latest()
.then(function(){
  if (process.env.NODE_ENV !== 'test'){
    //run real seed files
  } else {
    //run test version seed files
  }
});


knex.deleteEverything = function () {
  if (env !== 'test') return Promise.reject();

  return Promise.all([
    knex.schema.dropTable('userRoles'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('shelterManagers'),
    knex.schema.dropTable('organizations'),
    knex.schema.dropTable('shelters'),
    knex.schema.dropTable('shelterUnits'),
    knex.schema.dropTable('shelterOccupancy'),
    knex.schema.dropTable('userSessions')
  ]);
};




