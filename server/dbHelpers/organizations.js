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
    console.log('passed in orgName ', orgName);

  //delete specific organization ID
  return knex('organizations')
          .returning('*')
          .where('organizationName', orgName)
          .del()
  .catch(function(err){
    console.log("Something went wrong deleting this organization ", err);
  })
  .then(function(organizations){
    console.log("Deleted organization ", organizations);
    return organizations;
  });
};

exports.selectOrganization = function(req){
  var orgName = req.organizations.orgName;
  console.log('passed in orgName ', orgName);
  //select specific organization ID
return knex.select('*').table('organizations')
            // .returning('*')
            .where('organizationName', orgName)
  .catch(function(err){
    console.log("Something went wrong selecting this organization ", err);
  })
  .then(function(organization){
    console.log("returned from selectOrg : " , organization);
    return organization;
  });
};

//updateOrganization expects req body to contain orgName and updatedOrgName
exports.updateOrganization = function(req){
  var orgName = req.organizations.orgName;
  var updatedOrgName = req.organizations.updatedOrgName;
    console.log('passed in orgName ', orgName);

  return knex('organizations')
          .returning('*')
          .where('organizationName', orgName)
          .update('organizationName', updatedOrgName)
  .catch(function(err){
    console.log("Something went wrong updating this organization ", err);
  })
  .then(function(organization){
    console.log("Updated organization from ", orgName, " to ", updatedOrgName);
  });

  //update specific organization 
};



