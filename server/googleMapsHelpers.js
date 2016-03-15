var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);
var locations = require('./dbHelpers/locations.js');
var express = require('express');
var request = require('request-promise');


//expect object {locations: {street: 1430 33rd ST NW, city: Washington, state: DC}}
exports.findGeolocation = function(address){
  var street = (address.locations.street).replace(' ', '+');
  var city = address.locations.city.replace(' ', '+');
  var state = address.locations.state.replace(' ', '+');
  var apiToken = process.env.GOOGLE_GEOCODE;
  var baseURL = "https://maps.googleapis.com/maps/api/geocode/json?";
  var fullURL = baseURL + 'address=' + street + ',+' + city + ',+' + state + '&key=' + apiToken;
  console.log('fullUrl ', fullURL);

  return request
          .get({uri: fullURL})
          .then(function(resp){
            console.log('response from googleAPI', resp.geometry.location);
            return resp.geometry.location;
          })
          .catch(function(err){
            console.error('There was an error getting geocode from google ', err);
          });
};

exports.fetchMapData = function() {

};

