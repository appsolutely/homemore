var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);

var getOrgID = function(orgName){
  console.log("Passed in org name", orgName);
  return knex.select('*')
              .from('organizations')
              .where('organizationName', orgName)
  .catch(function(err){
    console.log("Could not find organization with this name.", err);
    throw new Error("Could not find organization with this name", err);
  })
  .then(function(orgID){
    console.log("Found organization with id ", orgID[0].organizationID);
    return orgID[0].organizationID;
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
  
    return getOrgID(req.organizations.orgName)
      .then(function(org){
        console.log("result from look up org: ", org);
        return knex('shelters')
                .insert({
                    shelterName: name, 
                    shelterEmail: email, 
                    shelterEmergencyPhone: emergencyPhone, 
                    shelterDaytimePhone: daytimePhone,
                    fk_organizationID: org
                    // fk_shelterlocationID: shelterLocation,
                    // fk_hoursID: shelterHours
                  })
                .returning('*')
          .catch(function(err){
            console.log("Something went wrong inserting this shelter ", err);
            throw new Error("Something went wrong inserting this shelter ", err);
          })
          .then(function(shelter){
            console.log('Successfully inserted shelter with ID ', shelter[0].shelterID);
            return shelter;
          });     
      });

};

var getShelterID = function(shelterName){
      return knex.select('shelterID').from('shelters')
          .where('shelterName', shelterName)
          .catch(function(err){
            console.log("Something went wrong. This shelter may not exist.");
            throw new Error("Something went wrong. This shelter may not exist.");
          })
          .then(function(shelterID){
            console.log("Returing shelterID ", shelterID);
            return shelterID;
          });

};

module.exports.selectShelter = function(req){
    var shelter = req.shelters;
    return getShelterID(shelter)
      .then(function(shelter){
        var shelterID = shelter[0].shelterID;
        return knex.select('*').from('shelters')
                  .where('shelterID', shelterID)
          .catch(function(err){
            console.log("Something went wrong selecting this shelter ", err);
            throw new Error("Something went wrong selecting this shelter", err);           
          })
          .then(function(shelter){
          console.log("returned from select shelter : " , shelter);
            return shelter;
          });
      });
        //function for selecting shelter units
};

module.exports.updateShelter = function(req){
  //function for updating shelter units
    var name = req.shelters.shelterName;
    var email = req.shelters.shelterEmail;
    var emergencyPhone = req.shelters.shelterEmergencyPhone;
    var daytimePhone = req.shelters.shelterDayTimePhone;
    return knex('shelters')
            .where('shelterID', thisShelterID)
            .update({
                shelterName: name,
                shelterEmail: email, 
                shelterEmergencyPhone: emergencyPhone, 
                shelterDaytimePhone: daytimePhone            
            })
        .catch(function(err){
          console.log("Error updating this shetler", err);
          throw new Error("Error updating this shetler", err);
        })
        .then(function(updatedShelter){
          console.log("Updated shelter.");
          return updatedShelter;
        });
};

module.exports.deleteShelter = function(req){
      var shelter = req;
      return knex('shelters')
              .returning('*')
              .where('shelterID', shelter)
              .del()
      .catch(function(err){
        console.log("Something went wrong deleting this shelter");
        throw new Error("Something went wrong deleting this shelter");
      })
      .then(function(shelter){
        console.log("Deleted shelter with ID ", shelter[0].shelterID);
        return shelter;
      });

};


module.exports.insertShelterUnit = function(req){
  var unitSize = req.shelterUnit.unitSize;
  return getShelterID(req.shelterName)
      .then(function(shelter){
        var shelterID = shelter[0].shelterID;
        return knex('shelterUnits')
                .insert({
                  fk_shelterID: shelterID,
                  unitSize: unitSize
                })
                .returning('*')
        .catch(function(err){
          console.log("Something went wrong inserting this shelter unit.", err);
          throw new Error("Something went wrong inserting this shelter unit.", err);
        })
        .then(function(shelterUnit){
          console.log("Successfully inserted unit ", shelterUnit[0].shelterUnitID);
          return shelterUnit;
        });

      });
};

module.exports.deleteShelterUnit = function(req){
  //function for deleting specific shelter unit
  console.log("REQUEST DATA: ", req);
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