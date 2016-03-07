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
          .returning('*')
          .insert({organizationName: orgName})
  .catch(function(err){
    console.log("Organization may already exist. ", err);
  })
  .then(function(orgID){
    console.log("new org id: ", orgID);
    //take return new id 
    return orgID;
  });
};

exports.deleteOrganization = function(req){
  var orgName = req.organizations.orgName;
  //delete specific organization ID
  return knex.select('*')
          .from('organizations')
          .where('organizationID', orgID)
          .del()
  .catch(function(err){
    console.log("Something went wrong deleting this organization ", err);
  })
  .then(function(organizationID){
    console.log("Deleted organization with organization id = ", organizationID);
    return organizationID;
  });
};

exports.selectOrganization = function(req){
  var orgName = req.organizations.orgName;
  console.log('passed in orgName ', orgName);
  //select specific organization ID
  return knex('organizations')
        .where('organizationName', orgName)
        .then(function(organization){
          console.log("returned from selectOrg : " , organization);
          return organization;
        })
        .catch(function(err){
          console.log("Something went wrong selecting this organization ", err);
        });
};

exports.updateOrganization = function(req, orgID){
  //update specific organization ID
};



