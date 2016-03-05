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
    console.log('Running test version');
  }
});


knex.deleteEverything = function () {
  if (env !== 'test') return Promise.reject();

  return Promise.all([
    knex.schema.dropTableIfExists('userRoles'),
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('shelterManagers'),
    knex.schema.dropTableIfExists('organizations'),
    knex.schema.dropTableIfExists('shelters'),
    knex.schema.dropTableIfExists('shelterUnits'),
    knex.schema.dropTableIfExists('shelterOccupancy'),
    knex.schema.dropTableIfExists('userSessions')
  ]);
};




