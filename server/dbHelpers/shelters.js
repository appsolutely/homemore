var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);

//insertShelter expects req body to contain (
    //shelters.shelterName
    //shelters.shelterEmail
    //shelters.shelterEmergencyPhone
    //shelters.shelterDaytimePhone
    //shelters.shelterAddress
    //shelters.shelterLatLong    

//)
//get looked up orgID
<<<<<<< 668c5fb74fd688db0c1c3e6edd5aa6208155a9bc
module.exports.insertShelter = function(req, orgID, locationID){
    var name = req.shelters.shelterName;
    var email = req.shelters.shelterEmail;
    var emergencyPhone = req.shelters.shelterEmergencyPhone;
    var daytimePhone = req.shelters.shelterDaytimePhone;
    var monHours = req.shelters.shelterHoursMonday;
    var tuesHours = req.shelters.shelterHoursTuesday;
    var wedHours = req.shelters.shelterHoursWednesday;
    var thursHours = req.shelters.shelterHoursThursday;
    var friHours = req.shelters.shelterHoursFriday;
    var satHours = req.shelters.shelterHoursSaturday;
    var sunHours = req.shelters.shelterHoursSunday;
    var shelterLocation = locationID;
=======
module.exports.insertShelter = function(req, orgID){
    var name = req.shelter.shelterName
    var email = req.shelter.shelterEmail
    var emergencyPhone = req.shelter.shelterEmergencyPhone
    var daytimePhone = req.shelter.shelterDaytimePhone
>>>>>>> db helpers clean up

return knex('shelters')
  .returning('shelterID')
  .insert([{
      fk_organizationID: orgID, 
      shelterName: name, 
      shelterEmail: email, 
      shelterEmergencyPhone: emergencyPhone, 
      shelterDaytimePhone: daytimePhone, 
      fk_shelterlocationID: shelterLocation,
      shelterHoursMonday: monHours,
      shelterHoursTuesday: tuesHours,
      shelterHoursWednesday: wedHours,
      shelterHoursThursday: thursHours,
      shelterHoursFriday: friHours,
      shelterHoursSaturday: satHours,
      shelterHoursSunday: sunHours
    }])
  .catch(function(err){
    console.log("Something went wrong inserting this shelter ", err);
  })
  .then(function(shelterID){
    return shelterID;
  });
};

module.exports.selectShelter = function(req, shelterID){
  //function for selecting shelter units
<<<<<<< 668c5fb74fd688db0c1c3e6edd5aa6208155a9bc
  return knex.select().table('shelters')
            .where('shelterID', shelterID)
          .catch(function(err){
            console.log("Something went wrong selecting this shelter ", err);
          })
          .then(function(shelterID){
            return shelterID;
          });
};
=======
  // return knex.('shelters')
  //           .where('shelterID', shelterID)
}
>>>>>>> db helpers clean up

module.exports.updateShelter = function(req, shelterID){
  //function for updating shelter units
};

module.exports.deleteShelter = function(req, shelterID){
  //function for deleting shelter units
  // knex('shelters')
  //   .where('shelterID', shelterID)
  //   .del()

<<<<<<< 668c5fb74fd688db0c1c3e6edd5aa6208155a9bc
};
=======
}
>>>>>>> db helpers clean up

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