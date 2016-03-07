var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);

var getOrgID = function(orgName){
  console.log("Passed in org name", orgName);
  return knex.select('organizationID')
              .from('organizations')
              .where('organizationName', orgName)
  .catch(function(err){
    console.log("Could not find organization with this name.", err);
  })
  .then(function(orgID){
    console.log("Found organization with id ", orgID);
    return orgID;
  });
};

//insertShelter expects req body to contain (
    //shelters.shelterName
    //shelters.shelterEmail
    //shelters.shelterEmergencyPhone
    //shelters.shelterDaytimePhone

//)
//get looked up orgID
module.exports.insertShelter = function(req){
    var name = req.shelters.shelterName;
    var email = req.shelters.shelterEmail;
    var emergencyPhone = req.shelters.shelterEmergencyPhone;
    var daytimePhone = req.shelters.shelterDayTimePhone;
    console.log("REQUEST: ", req);
    var org = getOrgID(req.organizations.orgName);
    // var shelterHours = req.shelters.shelterHours;
    // var shelterLocation = locationID;

return knex('shelters')
  .returning('shelterID')
  .insert([{
      shelterName: name, 
      shelterEmail: email, 
      shelterEmergencyPhone: emergencyPhone, 
      shelterDaytimePhone: daytimePhone,
      fk_organizationID: orgId
      // fk_shelterlocationID: shelterLocation,
      // fk_hoursID: shelterHours
    }])
  .catch(function(err){
    console.log("Something went wrong inserting this shelter ", err);
  })
  .then(function(shelterID){
    return shelterID;
  });
};

module.exports.selectShelter = function(req){
  var shelterName = req.shelters.shelterName;
  // var shelterID = getShelterID(shelterName);
  console.log("Passed in shelter with id", shelterName);
  //function for selecting shelter units
  return knex.select('*').from('shelters')
            .where('shelterName', shelterName)
    .catch(function(err){
      console.log("Something went wrong selecting this shelter ", err);
    })
    .then(function(shelter){
    console.log("returned from select shelter : " , shelter);
      return shelter;
    });
};

module.exports.updateShelter = function(req){
  //function for updating shelter units
  // var shelterName = req.shelters.shelterName;
};

module.exports.deleteShelter = function(req){
  var shelterName = req.shelters.shelterName;
  var shelterID = getShelterID(shelterName);
  console.log('passed in shelter name ', shelterName);
  console.log('found matching id ', shelterID);

  return knex('shelters')
          .returning('*')
          .where('shelterName', shelterName)
          .del()
  .catch(function(err){
    console.log("Something went wrong deleting this shelter");
  })
  .then(function(shelter){
    console.log("Deleted shelter ", shelter);
    return shelter;
  });
  //function for deleting shelter units
  // knex('shelters')
  //   .where('shelterID', shelterID)
  //   .del()

};
var getShelterID = function(shelter){
  console.log('passed in shelter name ', shelter);

  return knex.select('*').from('shelters')
          // .returning('shelterID')
          .where('shelterName', shelterName)
  .catch(function(err){
    console.log("Something went wrong. This shelter may not exist.");
  })
  .then(function(shelterID){
    console.log("Returing shelter id ", shelterID);
    return shelterID;
  });

};

module.exports.insertShelterUnit = function(req, shelterID){
  //function for inserting shelter units
};

module.exports.deleteShelterUnit = function(req, shelterUnitID){
  //function for deleting specific shelter unit
};

module.exports.insertShelterEligibility = function(req, shelterID){
  //function for inserting shelter elgibiltiy rules
};

module.exports.deleteShelterEligibility = function(req, shelterEligibilityID){
  //function for deleting specific shelter eligibility rule
};

module.exports.insertShelterOccupancy = function(req, shelterID, userID){
  //inserting new 
};

module.exports.updateShelterOccupancy = function(req, occupancyID){
  //function for updating shelter occupancy for a given user
};

module.exports.deleteShelterOccupancy = function(req, occupancyID){
  //function for deleting specific shelter occupancy record
};