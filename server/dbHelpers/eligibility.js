var db = require('./db');
var config = require('../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);

//insertEligibilityOption expects req body to contain (
    //eligibility.eligibilityOption
    //eligibility.eligibilityOptionDescription
    //eligibility.eligibilityParentID
//)

module.exports.insertEligibilityOption = function(req){

}

module.exports.updateEligibilityOption = function(req){

}

module.exports.deleteEligibilityOption = function(req){

}
