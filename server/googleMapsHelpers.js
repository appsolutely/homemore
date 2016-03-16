var db = require('../db/db.js');
var config = require('../knexfile.js');  
var env =  process.env.NODE_ENV || 'development'; 
var Promise = require('bluebird');
var knex = require('knex')(config[env]);
var locations = require('./dbHelpers/locations.js');
var express = require('express');
var request = require('request-promise');


//expect object looking like {locations: {street: 1430 33rd ST NW, city: Washington, state: DC}}
exports.findGeolocation = function(address){
  var street = encodeURIComponent(address.locations.street);
  var city = encodeURIComponent(address.locations.city);
  var state = encodeURIComponent(address.locations.state);
  console.log(street, city, state);
  var apiToken = process.env.GOOGLE_GEOCODE;
  var baseURL = "https://maps.googleapis.com/maps/api/geocode/json?";
  var fullURL = baseURL + 'address=' + street + ',%20' + city + ',%20' + state + '&key=' + apiToken;
  console.log('fullUrl ', fullURL);

  return request
          .get({uri: fullURL})
          .then(function(resp){
            var response = JSON.parse(resp);
            console.log('response from googleAPI', response.results[1]);
            var location = response.results[1].geometry.location;
            return knex('locations')
                        .update({lat: location.lat, long: location.long})
                        .where('locationStreet', address.locations.street)
                        .returning('*');
          })
          .catch(function(err){
            console.error('There was an error getting geocode from google ', err);
          });
};


