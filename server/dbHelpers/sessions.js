var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);

exports.createNewSession = function(userID){
  var sessionId = uuid();
  return knex.insert({sessionID: sessionId, 
                      fk_userID: userID})
            .into('userSessions')
            .returning('*')
            .then(function(result){
              return result[0].sessionID;
            });
};

exports.findSession = function(sessionID){
  //will return both the sessionID and the userID
  return knex.select('*')
            .from('userSessions')
            .where('sessionID', sessionID)
            .then(function(result){
              return result;
            });
};

exports.logout = function(sessionID) {
  return knex('userSession')
          .where('sessionID', sessionID)
          .del();
};
