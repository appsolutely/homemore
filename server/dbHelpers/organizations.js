var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);


//insertorganizations expects req body to contain (
    //organization.orgName
//)


module.exports.selectAllOrganizations = function(){
    return knex.select('*').from('organizations')
      .catch(function(err){
        console.error("Something went wrong selecting all organizations", err);
        throw new Error("Something went wrong selecting all organizations", err);
      })
      .then(function(organizations){
        return organizations;
      });
};

exports.insertOrganization = function (req) {
  var orgName = req.organizations.orgName;

//insert organization name and return new id
  return knex('organizations')
          .returning('*')
          .insert({organizationName: orgName})
  .catch(function(err){
    console.error("Organization may already exist. ", err);
    throw new Error("Organization may already exist. ", err);
  })
  .then(function(orgID){
    //take return new id 
    return orgID;
  });
};

exports.deleteOrganization = function(req){
  var orgName = req.organizations.orgName;

  //delete specific organization ID
  return knex('organizations')
          .returning('*')
          .where('organizationName', orgName)
          .del()
  .catch(function(err){
    console.error("Something went wrong deleting this organization ", err);
    throw new Error("Something went wrong deleting this organization ", err);
  })
  .then(function(organizations){
    return organizations;
  });
};

exports.selectOrganization = function(req){
  var orgName = req.organizations.orgName;
  //select specific organization ID
return knex.select('*').table('organizations')
            .where('organizationName', orgName)
  .catch(function(err){
    console.error("Something went wrong selecting this organization ", err);
    throw new Error("Something went wrong selecting this organization ", err);
  })
  .then(function(organization){
    return organization;
  });
};

//updateOrganization expects req body to contain orgName and updatedOrgName
exports.updateOrganization = function(req){
  var orgName = req.organizations.orgName;
  var updatedOrgName = req.organizations.updatedOrgName;

  return knex('organizations')
          .returning('*')
          .where('organizationName', orgName)
          .update('organizationName', updatedOrgName)
  .catch(function(err){
    console.error("Something went wrong updating this organization ", err);
    throw new Error("Something went wrong updating this organization ", err);
  })
  .then(function(organization){
    return organization;
  });
};

var getOrgID = function(orgName){
  return knex.select('*')
              .from('organizations')
              .where('organizationName', orgName)
  .catch(function(err){
    console.error("Could not find organization with this name.", err);
    throw new Error("Could not find organization with this name", err);
  })
  .then(function(orgID){
    return orgID[0].organizationID;
  });
};

