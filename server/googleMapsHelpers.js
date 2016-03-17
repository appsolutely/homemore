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
  var apiToken = process.env.GOOGLE_GEOCODE;
  var baseURL = "https://maps.googleapis.com/maps/api/geocode/json?";
  var fullURL = baseURL + 'address=' + street + ',%20' + city + ',%20' + state + '&key=' + apiToken;


  return request
          .get({uri: fullURL})
          .then(function(resp){
            var response = JSON.parse(resp);
            var location = response.results[0].geometry.location;
            return knex('locations')
                        .update({lat: location.lat, long: location.lng})
                        .where('locationStreet', address.locations.street)
                        .returning('*');
          })
          .catch(function(err){
            console.error('There was an error getting geocode from google ', err);
            throw err;
          })
          .then(function(result){
            // console.log('result from google ', result);
            return result;
          });
};


