var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
var orgHelpers = require('./organizations.js');
var shelterHelpers = require('./shelters.js');
var sessions = require('./sessions.js');
var generatePassword = require('password-generator');

//check that no one else has been registered with the email before being passed here
exports.addNewPublic = function(reqBody){
  console.log('in user ', reqBody);
  var userRoleId;
  var userID;
  var user = reqBody.pubUser;
  console.log('user', user);
  //hash password
  return selectRole('Registered')  
        .then(function(result){
          console.log('result after selectRole ', result);
          userRoleId = result[0].userRoleID;
          return;
        })
        .then(function(){
          return bcrypt.genSaltAsync(10);
        })
        .then(function(result) {
          return bcrypt.hashAsync(user.password, result, null);
        })
        .then(function(hashed){
          return knex.insert({userFirstName: user.firstName,
                              userLastName: user.lastName,
                              userPassword: hashed, 
                              userEmail: user.email,
                              fk_userRole: userRoleId})
                     .into('users')
                     .returning(['userID', 'userFirstName', 'userLastName', 'userEmail']);
        })
        .then(function(result){
          // console.log('result of new public user ', result);
          return result;
        })
        .catch(function(err){
          // console.error('error in create public ', err);
          throw 'Error in create new Public user ' + err;
        });
};

// var adminUser = {adminUser: {firstName: 'Billy', lastname: 'the kid', password: 'anotherlongstring', email: 'billy@example.com'}, organizations:{orgName:'FrontSteps'}};    
exports.addNewAdmin = function(reqBody){
  var userRoleId;
  var user = reqBody.adminUser;
  var response = {};
  var userID;
  console.log('user ', user);
  //find userRoleID
  return selectRole('Admin')  
        .then(function(result){
          userRoleId = result[0].userRoleID;
          return;
        })
        .then(function(){
          //hash password
        return bcrypt.genSaltAsync(10);
        })
        .then(function(result) {
          return bcrypt.hashAsync(user.password, result, null);
        })
        .then(function(hashed){
          //then create the new user
          return knex.insert({userFirstName: user.firstName,
                              userLastName: user.lastName,
                              userPassword: hashed, 
                              userEmail: user.email,
                              fk_userRole: userRoleId})
                     .into('users')
                     .returning(['userID', 'userFirstName', 'userLastName', 'userEmail']);
        })
        .then(function(res){
          //saving that response to send back at the end
          // console.log('returned from insert ', res);
          response.user = res[0];
          // console.log('response after newuser is made ', response);
          userID = res[0].userID;
          return;
        })
        .then(function(){
          //now trying to find the organization
          return orgHelpers.selectOrganization(reqBody);
        })
        .then(function(result){
          //if the organization exists pass along to next then
          if (result.length > 0){
            return result;
          } else {
            //if it doesn't throw and error for the catch
            throw 'No such Organization';
          }
        })
        .catch(function(resp){
          //insert new org unless there was another error
          if (resp === 'No such Organization'){
            return orgHelpers.insertOrganization(reqBody);
          } else {
            console.error('Error in new Admin ', resp);
          }
        })
        .then(function(resp){
          //either a new organization or an existing one
          //adds user as an admin for that organization
            var orgId = resp[0].organizationID;
            return knex.insert({fk_userID: userID,
                                fk_organizationID: orgId})
                        .into('orgAdmins')
                        .returning('*');
        })
        .then(function(res){
          //adds the adminID stuff to the response to send back
          response.adminID = res[0];
          // console.log('result from add new Admin ', response);
          return;
        })
        .then(function(){
          return [response];
        });
};

//shelter manager -- generates a random password for the user and on api level shoots off an email
exports.addNewManager = function(reqBody){
  // console.log('INSIDE NEW MANAGER ', reqBody);
  var userRoleId;
  var user = reqBody.managerUser;
  var response = {};
  var userID;
  var genPass;
  var shelterName = {shelters: reqBody.shelters.shelterName};
  // console.log('shelter name passed in ', reqBody.shelters.shelterName);

  return selectRole('Manager')
          .then(function(result){
            userRoleId = result[0].userRoleID;
            //generate a random password that we will email to the user in their confirmation email
            genPass = generatePassword();
            // console.log('generated password ', genPass);
            return bcrypt.genSaltAsync(10);
          })
          .then(function(result) {
            return bcrypt.hashAsync(genPass, result, null);
          })
          .then(function(hashed){
          return knex.insert({userFirstName: user.firstName,
                              userLastName: user.lastName,
                              userPassword: hashed, 
                              userEmail: user.email,
                              fk_userRole: userRoleId})
                     .into('users')
                     .returning(['userID', 'userFirstName', 'userLastName', 'userEmail']);            
          })
          .then(function(result){
            response.user = result[0];
            userID = result[0].userID;
            //checking if the shelter already exists
            return shelterHelpers.selectShelter(shelterName);
          })
          .then(function(result){
            // console.log('returned from select ', result);
            if (result.length > 0){
              return result;
            } else {
              throw 'Shelter does not yet exist';
            }
          })
          .catch(function(err){
            // console.log('err message in catch ', err);
              //if hit the catch probably need to create a new shelter
            return shelterHelpers.insertShelter(reqBody);
          })
          .then(function(result){
            // console.log('result from finding/creating shelter ', result);
            //either a brand new shelter or the found shelter
            var shelterID = result[0].shelterID;
            return knex.insert({fk_userID: userID,
                                fk_shelterID: shelterID,
                                accessApproved: false})
                       .into('shelterManagers')
                       .returning('*');
          })
          .then(function(result){
            response.shelterID = result[0];
            response.genPass = genPass;
            // console.log('response right before returning new manager ', response);
            return [response];
          });
};

//requires -- req.body and req.session.userID
exports.updateUser = function(req){
  var reqBody = req.body;
  var userId = req.session.fk_userID;
  var password = reqBody.user.password || '';
  var firstname = reqBody.user.firstName || '';
  var lastname = reqBody.user.lastName || '';
  var mainEmail = reqBody.user.email || '';
  var managerEmail = reqBody.user.managerEmail || '';

  if (password.length > 0){
    //hash new password and update
    console.log('inside update password');
    return bcrypt.genSaltAsync(10)
          .then(function(salt) {
            return bcrypt.hashAsync(password, salt, null);
          })
          .then(function(hashed){
          return knex('users')
                .update('userPassword', hashed)
                .returning('userID')
                .where('userID', userId);
          })
          .then(function(result){
            // console.log('response from update password ', result);
            return result;
          })
          .catch(function(err){
            console.error('error in update password', err);
            return;
          });
  } else if (mainEmail.length > 0){
    //first check if email is already being used
    //then update
    console.log('newEmail ', mainEmail);
    return this.findByUserEmail(reqBody)
        .then(function(res){
          // console.log('checked if email is in use ', res);
          if (res.length > 0) {
            throw new Error('Email is already in use');
          } else {
            return knex('users')
                .update('userEmail', mainEmail)
                .returning('*')
                .where('userID', userId)
              .then(function(res){
                // console.log('result from newEmail ', res);
                return res;
              });
          }
        });
  } else if (firstname.length > 0){
    return knex('users')
        .update('userFirstName', firstname)
        .where('userID', userId)
        .returning('*')
        .then(function(res){
          return res;
        });
  } else if (lastname.length > 0){
    return knex('users')
        .update('userLastName', lastname)
        .where('userID', userId)
        .returning('*')
        .then(function(res){
          return res;
        });    
  } else if (managerEmail.length > 0){
    //not sure if this will exist yet
    //manager table currently in flux
    return;
  } else {
    throw new Error('Nothing provided to update');
  }
};

//pass in just the userId
exports.findByUserID = function(userId){
  console.log('userID passed in ', userId);
  return knex.select('*')
      .from('users')
      .where('userID', userId)
      .then(function(result){
        // console.log('returned from select ', result);
        return result;
      });
};

//pass in just the email
exports.findByUserEmail = function(email){
  console.log('email passed in ', email);
  return knex.select('*')
              .from('users')
              .where('userEmail', email.user.email)
              .then(function(result){
                // console.log('retured from select email ', result);
                return result;
              });
};

//will return only the userRoleName
exports.findUserRole = function(userId){
  //first find the user
  console.log('userId passed into findUserRole ', userId);
  return this.findByUserID(userId)
      .then(function(res){
        console.log('inside findUsersRole ', res);
        return knex.select('*')
                   .from('userRoles')
                   .where('userRoleID', res[0].fk_userRole);
      })
      .then(function(res){
        console.log('found role ', res);
        return res[0].userRoleName;
      });
};

// will return the name of their organizations
exports.findUserOrganization = function(userId){
  return knex.select('*')
            .from('orgAdmins')
            .where('fk_userID', userId)
            .rightOuterJoin('organizations', 'orgAdmins.fk_organizationID', 'organizations.organizationID')
            .then(function(res){
              // console.log('response from select organization ', res);
              return res;
            });
};

exports.findUserShelter = function(userId){
  return knex.select('*')
             .from('shelterManagers')
             .where('fk_userID', userId)
             .rightOuterJoin('shelters', 'shelterManagers.fk_shelterID', 'shelters.shelterID')
             .then(function(shelter){
                return shelter;
             });
};

// passes off to sessions at end
exports.signIn = function(reqBody){
  var user;
  //first find user by email
  console.log('inside signin ', reqBody);
  return this.findByUserEmail(reqBody)
              .then(function(result){
                if (result.length > 0){
                  return result[0];
                } else {
                  throw 'User does not exist';
                }
              })
              .catch(function(err){
                if (err === 'User does not exist') {
                  throw {error: 'User does not exist'};
                } else {
                  throw {error: 'unknown error in signin: ' + err.message};
                }
              })
              .then(function(user){
              return new Promise(function(resolve, reject){
                  bcrypt.compareAsync(reqBody.user.password, user.userPassword, function(err, res){
                     if (err) {
                      throw err;
                     } else if (res === true) {
                      return resolve(sessions.createNewSession(user.userID));
                     } else {
                      return reject('incorrect password');
                     }
                    });
                });
              })
              .then(function(session){
                console.log('returned from session ', session);
                return session;
              })
              .catch(function(err){
                console.log('there was an error ', err);
                throw err;
              });
};


//adds an existing manager to another shelter
exports.addShelter = function(req){
  var reqBody = req.body;
  var userID = req.session.userID;
  var shelterName = {shelters: reqBody.shelters.shelterName};

//first check if the shelter already exists
  return shelterHelpers.selectShelter(shelterName)
          .then(function(resp){
            if (resp.length > 0) {
              return resp;
            } else {
              throw 'no such shelter exists';
            }
          })
          .catch(function(err){
            // console.error('Error in user.addShelter ', err);
            return shelterHelpers.insertShelter(reqBody);
          })
          .then(function(result){
            return knex.insert({fk_userID: userID, 
                                fk_shelterID: result[0].shelterID,
                                accessApproved: true})
             .into('shelterManagers')
             .returning('*');
          })
          .then(function(result){
            return result;
          });
};

exports.setAccessTrue = function(userID, role){
  if (role === 'Admin'){
    return knex(orgAdmins)
            .update('accessApproved', true)
            .where('fk_userID', userID)
            .returning('*');
  } else {
    return knex(shelterManagers)
          .update('accessApproved', true)
          .where('fk_userID', userID)
          .returning('*');
  }
};

exports.findUserAccess = function(userID, role) {
  if (role === 'Admin'){
    return knex.select('accessApproved')
            .from(orgAdmins)
            .where('accessApproved', true)
            .andWhere('fk_userID', userID);
  } else if (role === 'Manager'){
    return knex.select('accessApproved')
            .from(shelterManagers)
            .where('accessApproved', true)
            .andWhere('fk_userID', userID);
  } else {
    //they are a public user so they don't have access
    return false;
  }
};


var selectAdminInfo = function(userID){
  return knex.select('*')
             .from('orgAdmins')
             .where('fk_userID', userID);
};

//find the UserRoleID for insertion purposes
var selectRole = function(role){
  return knex.select('*')
             .from('userRoles')
             .where('userRoleName', role)
             .then(function(result){
              return result;
             });
};

