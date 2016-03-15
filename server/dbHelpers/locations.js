var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);
var google = require('../googleMapsHelpers.js');


module.exports.insertLocation = function(req){
  // console.log("INSERT LOCATION REQ", req);
  //add new physical location
  var name = req.locations.name;
  var street = req.locations.street;
  var city = req.locations.city;
  var state = req.locations.state;
  var zip = req.locations.zip;
  var phone = req.locations.phone;
  var hoursMon = req.hours.monday;
  var hoursTues = req.hours.tuesday;
  var hoursWed = req.hours.wednesday;
  var hoursThu = req.hours.thursday;
  var hoursFri = req.hours.friday;
  var hoursSat = req.hours.saturday;
  var hoursSun = req.hours.sunday;
  var inserted;

  return knex('hours')
          .insert({
            hoursMonday: hoursMon,
            hoursTuesday: hoursTues,
            hoursWednesday: hoursWed,
            hoursThursday: hoursThu,
            hoursFriday: hoursFri,
            hoursSaturday: hoursSat,
            hoursSunday: hoursSun
          })
          .returning('hoursID')
  .catch(function(err){
    // console.log("Something went wrong inserting these hours.", err);
    throw new Error("Something went wrong inserting these hours.", err);
  })
  .then(function(hours){
    // console.log("Successfully inserted hours");
    var hoursID = hours[0];
    // console.log("HOURS FK ID", hoursID);

      return knex('locations')
              .insert({
                locationName: name,
                locationStreet: street,
                locationCity: city,
                locationState: state,
                locationZip: zip,
                locationPhone: phone,
                fk_hourID: hoursID
              })
              .returning('*')
      .catch(function(err){
        // console.log("Something went wrong inserting this location", err);
        throw new Error("Something went wrong inserting this location", err);
      })
      .then(function(location){
        inserted = location;
        // console.log("Successfully inserted location");
        return google.findGeolocation();
      });
  });
};


var getLocationID = function(name, street){
  return knex.select('locationID').from('locations')
            .where({
              'locationName': name,
              'locationStreet': street
            })
  .catch(function(err){
    // console.log("This location does not exist. ", err);
    throw new Error("This location does not exist. ", err);
  })
  .then(function(location){
    // console.log("Found location with ID: ", location[0].locationID);
    return location[0].locationID;
  });
};

module.exports.selectLocation = function(req){
    // console.log("SELECT LOCATION REQ", req);
    var locationName = req.locations.name;
    var locationStreet = req.locations.street;
    return getLocationID(locationName, locationStreet)
    .then(function(locationID){
        return knex.select('*').from('locations')
                  .where('locationID', locationID)
        .catch(function(err){
          // console.log("Something went wrong selecting this location", err);
          throw new Error("Something went wrong selecting this location", err);
        })
        .then(function(location){
          // console.log("Successfully selected location");
          return location;
        });
    });

//select physical location
};


module.exports.updateLocation = function(req){
  // console.log("UPDATE LOCATION REQ", req);
  var forLocationID = req.locations.thisLocationID;
  var forHoursID = req.locations.thishourID_fk;

  var name = req.locations.name;
  var street = req.locations.street;
  var city = req.locations.city;
  var state = req.locations.state;
  var zip = req.locations.zip;
  var phone = req.locations.phone;
  var hoursMon = req.hours.monday;
  var hoursTues = req.hours.tuesday;
  var hoursWed = req.hours.wednesday;
  var hoursThu = req.hours.thursday;
  var hoursFri = req.hours.friday;
  var hoursSat = req.hours.saturday;
  var hoursSun = req.hours.sunday;

  return knex('hours')
          .where('hoursID', forHoursID)
          .update({
            hoursMonday: hoursMon,
            hoursTuesday: hoursTues,
            hoursWednesday: hoursWed,
            hoursThursday: hoursThu,
            hoursFriday: hoursFri,
            hoursSaturday: hoursSat,
            hoursSunday: hoursSun
          })
          .returning('hoursID')
  .catch(function(err){
    // console.log("Something went wrong updating these hours.", err);
    throw new Error("Something went wrong updating these hours.", err);
  })
  .then(function(hours){
    console.log("Successfully updated hours");
    var hoursID = hours[0];
    // console.log("HOURS FK ID", hoursID);

      return knex('locations')
              .where('locationID', forLocationID)
              .update({
                locationName: name,
                locationStreet: street,
                locationCity: city,
                locationState: state,
                locationZip: zip,
                locationPhone: phone,
                fk_hourID: hoursID
              })
              .returning('*')
      .catch(function(err){
        // console.log("Something went wrong updating this location", err);
        throw new Error("Something went wrong updating this location", err);
      })
      .then(function(location){
        // console.log("Successfully updated location");
        return location;
      });
  });
//update physical location or details
};

module.exports.deleteLocation = function(req){
    // console.log("DELETE LOCATION REQ", req);
  var forLocationID = req.locations.thisLocationID;
  // var forHoursID = req.locations.thishourID_fk;    
      return knex('locations')
              .returning('*')
              .where('locationID', forLocationID)
              .del()
      .catch(function(err){
        // console.log("Something went wrong deleting this location");
        throw new Error("Something went wrong deleting this location");
      })
      .then(function(location){
        // console.log("Deleted location with ID ", location[0].locationID);
        return location;
      });

//delete physical location
};
