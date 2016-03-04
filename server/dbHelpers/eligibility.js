var db = require('./db');
var config = require('../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);

//insertEligibilityOption expects req body to contain (
    //eligibility.eligibilityOption
    //eligibility.eligibilityOptionDescription
    //eligibility.eligibilityParentID
//)

//insert option for shelters
module.exports.insertEligibilityOption = function(req){
  //add new eligibility option
};

//update options for shelters
module.exports.updateEligibilityOption = function(req, optionID){
//update eligibility option or details
};

//delete option on shelter
module.exports.deleteEligibilityOption = function(req, optionID){
//delete eligibility option
};

