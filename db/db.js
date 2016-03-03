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


