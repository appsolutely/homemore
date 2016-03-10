var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);


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
    console.log("Something went wrong inserting these hours.", err);
    throw new Error("Something went wrong inserting these hours.", err);
  })
  .then(function(hours){
    console.log("Successfully inserted hours");
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
        console.log("Something went wrong inserting this location", err);
        throw new Error("Something went wrong inserting this location", err);
      })
      .then(function(location){
        console.log("Successfully inserted location");
        return location;
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
    console.log("This location does not exist. ", err);
    throw new Error("This location does not exist. ", err);
  })
  .then(function(location){
    console.log("Found location with ID: ", location[0].locationID);
    return location[0].locationID;
  });

};

module.exports.selectLocation = function(req){
    console.log("SELECT LOCATION REQ", req);
    var locationName = req.locations.name;
    var locationStreet = req.locations.street;
    return getLocationID(locationName, locationStreet)
    .then(function(locationID){
      console.log("SELECT location with ID: ", locationID);
        return knex.select('*').from('locations')
                  .where()
    });

//select physical location
};

module.exports.updateLocation = function(req){
  console.log("UPDATE LOCATION REQ", req);

//update physical location or details
};

module.exports.deleteLocation = function(req){
    console.log("DELETE LOCATION REQ", req);

//delete physical location
};
