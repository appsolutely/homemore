var db = require('./db');
var config = require('../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);

//insertShelter expects req body to contain (
    //shelter.shelterName
    //shelter.shelterEmail
    //shelter.shelterEmergencyPhone
    //shelter.shelterDaytimePhone
    //shelter.shelterAddress
    //shelter.shelterLatLong    

//)
//get looked up orgID
module.exports.insertShelter = function(req, orgID){
    var name = req.body.shelter.shelterName
    var email = req.body.shelter.shelterEmail
    var emergencyPhone = req.body.shelter.shelterEmergencyPhone
    var daytimePhone = req.body.shelter.shelterDaytimePhone
    var address = req.body.shelter.shelterAddress
    var latlong = req.body.shelter.shelterLatLong

return knex('shelters')
  .returning('shelterID')
  .insert([{fk_organizationID: orgID, shelterName: name, shelterLatLong:latlong, shelterEmail: email, shelterEmergencyPhone: emergencyPhone, shelterDaytimePhone: daytimePhone, shelterAddress: address}])
  .catch(function(err){
    console.log("Something went wrong inserting this shelter", err)
  })
  .then(function(shelterID){
    return shelterID
  })
}

module.exports.insertShelterUnit = function(req, shelterID){
  //function for inserting shelter units
}

module.exports.deleteShelterUnit = function(req, shelterUnitID){
  //function for deleting specific shelter unit
}

module.exports.insertShelterEligibility = function(req, shelterID){
  //function for inserting shelter elgibiltiy rules
}

module.exports.deleteShelterEligibility = function(req, shelterEligibilityID){
  //function for deleting specific shelter eligibility rule
}

module.exports.insertShelterOccupancy = function(req, shelterID, userID){
  //inserting new 
}

module.exports.updateShelterOccupancy = function(req, occupancyID){
  //function for updating shelter occupancy for a given user
}

module.exports.deleteShelterOccupancy = function(req, occupancyID){
  //function for deleting specific shelter occupancy record
}