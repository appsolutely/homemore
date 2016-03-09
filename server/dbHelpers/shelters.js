var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);


module.exports.selectAllOrganizations = function(){
    return knex.select('*').from('organizations')
      .catch(function(err){
        console.log("Something went wrong selecting all organizations", err);
        throw new Error("Something went wrong selecting all organizations", err);
      })
      .then(function(organizations){
        console.log("Returning all organizations");
        return organizations;
      });
};

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
          console.log("Successfully returned select shelter" );
            return shelter;
          });
      });
        //function for selecting shelter units
};


module.exports.selectAllShelters = function(){
    return knex.select('*')
                .from('shelters')
                .innerJoin('organizations', 'shelters.fk_organizationID', 'organizations.organizationID')
                .leftOuterJoin('locations', 'shelters.fk_locationID', 'locations.locationID')
                .leftOuterJoin('hours', 'shelters.fk_hoursID', 'hours.hoursID')
      .catch(function(err){
        console.log("Something went wrong selecting all shelters", err);
        throw new Error("Something went wrong selecting all shelters", err);
      })
      .then(function(shelters){
        console.log("Returning all shelters");
        return shelters;
      });
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
  var shelterID = req[0].shelterID;
      return knex('shelters')
              .returning('*')
              .where('shelterID', shelterID)
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
    var shelterUnitID = req[0].shelterUnitID;

    return knex('shelterUnits')
              .returning('*')
              .where('shelterUnitID', shelterUnitID)
              .del()
    .catch(function(err){
      console.log("Something went wront deleting this shelter unit", err);
      throw new Error("Something went wront deleting this shelter unit", err);
    })
    .then(function(shelterUnit){
      console.log("Successfully deleted shelter unit ", shelterUnit);
      return shelterUnit;
    });
  //function for deleting specific shelter unit
};


var getEligibilityID = function(eligibilityOption){
    return knex.select('eligibilityOptionID').from('eligibilityOptions')
        .where('eligibilityOption', eligibilityOption)
        .catch(function(err){
          console.log("Something went wrong. This eligibility option may not exist.");
          throw new Error("Something went wrong. This eligibility option may not exist.");
        })
        .then(function(eligibilityOptionID){
          console.log("Returing eligibilityOption with ID ", eligibilityOptionID[0].eligibilityOptionID);
          return eligibilityOptionID[0].eligibilityOptionID;
        });
};


module.exports.insertShelterEligibility = function(req){
  //function for inserting shelter elgibiltiy rules
  var eligibility = req.eligibility.eligibilityOption;
  return getEligibilityID(eligibility)
      .then(function(eligibilityID){
        var eligibilityOptionID = eligibilityID;
            return getShelterID(req.shelterName)
            .then(function(shelter){
                var shelterID = shelter[0].shelterID;
                return knex('shelterEligibility')
                        .insert({
                          fk_shelterID: shelterID,
                          fk_eligibilityOptionID: eligibilityOptionID
                        })
                        .returning('*')
                .catch(function(err){
                  console.log("Something went wrong inserting this shelter eligibility", err);
                  throw new Error("Something went wrong inserting this shelter eligibility", err);
                })
                .then(function(eligibility){
                  console.log("Successfully added shelter eligibility ");
                  return eligibility;
                });

            });
      });

};

module.exports.deleteShelterEligibility = function(req){
  var shelterEligID = req.shelterEligibilityID;

    return knex('shelterEligibility')
              .returning('*')
              .where('shelterEligibilityID', shelterEligID)
              .del()
    .catch(function(err){
      console.log("Something went wront deleting this shelter eligibility", err);
      throw new Error("Something went wront deleting this shelter eligibility", err);
    })
    .then(function(shelterEligibility){
      console.log("Successfully deleted shelter eligibility with id", shelterEligibility[0].shelterEligibilityID);
      return shelterEligibility;
    });
  //function for deleting specific shelter eligibility rule
};

module.exports.insertShelterOccupancy = function(req){
  // console.log("REQUEST FOR INSERT SHELTER OCCUP:", req);
  // var occupant = req.occupancy.name;
  // var unitID = unit[0].shelterUnitID;
  
  //       return knex('shelterOccupancy')
  //               .insert({
  //                 fk_shelterUnitID: unitID,
  //                 occupiedByName: occupant
  //               })
  //               .returning('*')
  //         .catch(function(err){
  //           console.log("There was an error inserting this occpancy record ", err);
  //           throw new Error("There was an error inserting this occpancy record ", err);
  //         })
  //         .then(function(shelterOccupantID){
  //           console.log("Successfully added occupancy record with ID ", shelterOccupantID);
  //           return shelterOccupantID;
  //         });
  // //inserting new 
};

module.exports.updateShelterOccupancy = function(req){
  //function for updating shelter occupancy for a given user
  console.log("REQ", req);
};

module.exports.deleteShelterOccupancy = function(req, occupancyID){
  //function for deleting specific shelter occupancy record
};