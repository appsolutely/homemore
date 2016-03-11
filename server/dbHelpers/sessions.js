var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);
var uuid = require('uuid');

exports.createNewSession = function(userID){
  var sessionID = uuid();
  return knex.insert({sessionId: sessionID, 
                      fk_userID: userID})
            .into('userSessions')
            .returning('*')
            .then(function(result){
              return result[0].sessionId;
            });
};

exports.findSession = function(sessionID){
  //will return both the sessionID and the userID
  return knex.select('*')
            .from('userSessions')
            .where('sessionId', sessionID)
            .then(function(result){
              return result;
            });
};

exports.logout = function(sessionID) {
  return knex('userSession')
          .where('sessionId', sessionID)
          .del();
};
