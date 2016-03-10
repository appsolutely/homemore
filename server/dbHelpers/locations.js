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
  var name = req.locations.locationName;
  var street = req.locations.locationStreet;
  var city = req.locations.locationCity;
  var state = req.locations.locationState;
  var zip = req.locations.locationZip;
  var phone = req.locations.locationPhone;
  
};

module.exports.updateLocation = function(req, locationID){
//update physical location or details
};

module.exports.deleteLocation = function(req, locationID){
//delete physical location
};

module.exports.selectLocation = function(req, locationID){
//select physical location
};
