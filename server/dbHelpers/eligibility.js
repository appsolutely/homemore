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
  //add new eligibility option
}

module.exports.updateEligibilityOption = function(req, optionID){
//update eligibility option or details
}

module.exports.deleteEligibilityOption = function(req, optionID){
//delete eligibility option
}
