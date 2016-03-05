var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);

//insertLocation expects req body to contain (
    //eligibility.Location
    //eligibility.Location
//)

module.exports.insertLocation = function(req){
  //add new physical location
  var name = req.locations.locationName
  var street = req.locations.locationStreet
  var city = req.locations.locationCity
  var state = req.locations.locationState
  var zip = req.locations.locationZip
  var phone = req.locations.locationPhone
  // var monHours = req.locations.locationHoursMonday
  // var tuesHours = req.locations.locationHoursTuesday
  // var wedHours = req.locations.locationHoursWednesday
  // var thursHours = req.locations.locationHoursThursday
  // var friHours = req.locations.locationHoursFriday
  // var satHours = req.locations.locationHoursSaturday
  // var sunHours = req.locations.locationHoursSunday
  
}

module.exports.updateLocation = function(req, locationID){
//update physical location or details
}

module.exports.deleteLocation = function(req, locationID){
//delete physical location
}

module.exports.selectLocation = function(req, locationID){
//select physical location
}
