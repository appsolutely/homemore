var config = require('../knexfile.js');
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);

module.exports = knex;

//things to add to this file:
//run seed file of any default data
//run latest migration if using migrations
knex.migrate.latest()
.then(function(){
  //anything that can only run once the database has been updated
  //maybe seeds etc
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




