var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);


//insertorganizations expects req body to contain (
    //organization.orgName
//)
exports.insertOrganization = function (req) {
  var orgName = req.organizations.orgName;

//insert organization name and return new id
  return knex('organizations')
    .returning('organizationID')
    .insert([{organizationName: orgName}])
  .catch(function(err){
    console.log("Organization may already exist. ", err);
  })
  .then(function(orgID){
    //take return new id 
    return orgID;
  });
};

exports.deleteOrganization = function(req, orgID){
  //delete specific organization ID
};

exports.selectOrganization = function(req, orgID){
  //select specific organization ID
};

exports.updateOrganization = function(req, orgID){
  //update specific organization ID
};



