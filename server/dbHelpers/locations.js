var db = require('./db');
var config = require('../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);

//insertLocation expects req body to contain (
    //eligibility.Location
    //eligibility.Location
//)

module.exports.insertLocation = function(req){
  //add new physical location
  var name = req.body.locations.locationName
  var street = req.body.locations.locationStreet
  var city = req.body.locations.locationCity
  var state = req.body.locations.locationState
  var zip = req.body.locations.locationZip
  var phone = req.body.locations.locationPhone
  var monHours = req.body.locations.locationHoursMonday
  var tuesHours = req.body.locations.locationHoursTuesday
  var wedHours = req.body.locations.locationHoursWednesday
  var thursHours = req.body.locations.locationHoursThursday
  var friHours = req.body.locations.locationHoursFriday
  var satHours = req.body.locations.locationHoursSaturday
  var sunHours = req.body.locations.locationHoursSunday
  
}

module.exports.updateLocation = function(req, locationID){
//update physical location or details
}

module.exports.deleteLocation = function(req, locationID){
//delete physical location
}
