var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);

exports.addNewPublic = function(){

};

exports.addNewAdmin = function(){

};

exports.changePassword = function(){

};

exports.changePersonalEmail = function(){

};

exports.changeMangagerEmail = function(){

};

exports.changeName = function(){

};

exports.findByUserID = function(){

};

exports.findByUserEmail = function(){

};

exports.findUserRole = function(){

};
