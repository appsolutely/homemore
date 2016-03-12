var config = require('../knexfile.js');
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);

module.exports = knex;

// runs latest migration (if any) to update the database
knex.migrate.latest()
.then(function () {
  if (process.env.NODE_ENV === 'production') {
    // run real seed files
    console.log('in production version');
    knex.seed.run()
    .catch(function(err){
      console.log(err);
    })
    .then(function(res){
      console.log('ran seed file');
    });
  } else {
    // run test version seed files
    console.log('Not running production version');
  }
})
.catch(function(err){
  console.log('Oh no ', err);
});


knex.deleteEverything = function () {
  if (env !== 'test') return Promise.reject();

  console.log('dropping all tables');
  return Promise.all([
    knex('userSessions').del(),
    knex('shelterOccupancy').del(),
    knex('shelterUnits').del(),
    knex('shelterManagers').del(),
    knex('shelterEligibility').del(),
    knex('eligibilityOptions').del(),
    knex('shelters').del(),
    knex('locations').del(),
    knex('orgAdmins').del(),
    knex('organizations').del(),
    knex('userSessions').del(),
    knex('users').del(),
    knex('userRoles').del()
  ]);
};




