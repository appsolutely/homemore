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
  var userRoleId;
  var userID;
  var user = reqBody.pubUser;
  //hash password
  return selectRole('Registered')
        .then(function(result){
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
                              userPhone: user.phone,
                              fk_userRole: userRoleId})
                     .into('users')
                     .returning(['userID', 'userFirstName', 'userLastName', 'userEmail']);
        })
        .then(function(result){
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
                              userPhone: user.phone,
                              fk_userRole: userRoleId})
                     .into('users')
                     .returning(['userID', 'userFirstName', 'userLastName', 'userEmail']);
        })
        .then(function(res){
          //saving that response to send back at the end
          response.user = res[0];
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
          return;
        })
        .then(function(){
          return [response];
        });
};

//shelter manager -- generates a random password for the user and on api level shoots off an email
exports.addNewManager = function(reqBody){
  var userRoleId;
  var user = reqBody.managerUser;
  var response = {};
  var userID;
  var genPass;
  var shelterName = {shelters: reqBody.shelters.shelterName};

  return selectRole('Manager')
          .then(function(result){
            userRoleId = result[0].userRoleID;
            //generate a random password that we will email to the user in their confirmation email
            genPass = generatePassword();
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
                              userPhone: user.phone,
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
            if (result.length > 0){
              return result;
            } else {
              throw 'Shelter does not yet exist';
            }
          })
          .catch(function(err){
            console.error('err message in catch ', err);
              //if hit the catch probably need to create a new shelter
            return shelterHelpers.insertShelter(reqBody);
          })
          .then(function(result){
            //either a brand new shelter or the found shelter
            var shelterID = result[0].shelterID;
            return knex.insert({fk_userID: userID,
                                fk_shelterID: shelterID,
                                accessApproved: false})
                       .into('shelterManagers')
                       .returning('*');
          })
          .then(function(result){
            response.genPass = genPass;
            return shelterHelpers.findShelterByID(result[0].fk_shelterID);
          })
          .then(function(result){
            response.shelter = result;
            return [response];
          });
};

//requires -- req.body and req.session.userID
exports.updateUser = function(req){
  var reqBody = req.body;
  var userId = req.session.fk_userID;
  var password = reqBody.user.password || 'placeholder';
  var firstname = reqBody.user.firstName || 'placeholder';
  var lastname = reqBody.user.lastName || 'placeholder';
  var mainEmail = reqBody.user.email || 'placeholder';
  var phone = reqBody.user.phone || 'placeholder';
  var changingEmail = reqBody.emailChanged || false; //flag to tell if they are changing their email
  var changingPassword = reqBody.passwordChanged || false;
  var hashed;

if(changingPassword){
  return bcrypt.genSaltAsync(10)
          .then(function(salt) {
            return bcrypt.hashAsync(password, salt, null);
          })
          .then(function(newPass){
            hashed = newPass;
            if (changingEmail) {
            //then check the email if they are changing it
            return this.findByUserEmail(reqBody);
            } else {
            return '';
            }
          })
          .then(function(resp){
            if (resp.length > 0) {
              throw 'UserEmail is already taken';
            } else {
              return;
            }
          })
          .then(function(){
          return knex('users')
                .update({'userPassword': hashed,
                         'userEmail': mainEmail,
                         'userFirstName': firstname,
                         'userPhone': phone,
                         'userLastName': lastname})
                .returning(['userEmail', 'userFirstName', 'userLastName'])
                .where('userID', userId);
          })
          .then(function(result){
            return result;
          })
          .catch(function(err){
            console.error('error in update User', err);
            throw err;
          });
  } else if (changingEmail) {
            //then check the email if they are changing it
    return this.findByUserEmail(reqBody)
          .then(function(resp){
            if (resp.length > 0) {
              throw 'UserEmail is already taken';
            } else {
              return;
            }
          })
          .then(function(){
          return knex('users')
                .update({userEmail: mainEmail,
                         userFirstName: firstname,
                         userPhone: phone,
                         userLastName: lastname})
                .returning(['userEmail', 'userFirstName', 'userLastName'])
                .where('userID', userId);
          })
          .then(function(result){
            return result;
          })
          .catch(function(err){
            console.error('error in update User', err);
            throw err;
          });
    } else {
      return knex('users')
          .update({userFirstName: firstname,
                   userPhone: phone,
                   userLastName: lastname})
          .returning(['userEmail', 'userFirstName', 'userLastName'])
          .where('userID', userId)
          .then(function(result){
            return result;
          })
          .catch(function(err){
            console.error('error in update User', err);
            throw err;
          });
    }
};

//pass in just the userId
exports.findByUserID = function(userId){
  return knex.select('*')
      .from('users')
      .where('userID', userId)
      .then(function(result){
        return result;
      });
};

//pass in just the email
exports.findByUserEmail = function(reqBody){
  var email = reqBody.user.email || reqBody.user.userEmail;
  return knex.select('*')
              .from('users')
              .where('userEmail', email)
              .then(function(result){
                return result;
              });
};

//will return only the userRoleName
exports.findUserRole = function(userId){
  //first find the user
  return this.findByUserID(userId)
      .then(function(res){
        return knex.select('*')
                   .from('userRoles')
                   .where('userRoleID', res[0].fk_userRole);
      })
      .then(function(res){
        return res[0].userRoleName;
      });
};

// will return the name of their organizations
exports.findUserOrganization = function(userId){
  return knex.select('*')
            .from('orgAdmins')
            .where('fk_userID', userId)
            .fullOuterJoin('organizations', 'orgAdmins.fk_organizationID', 'organizations.organizationID')
            .fullOuterJoin('shelters', 'organizations.organizationID', 'shelters.fk_organizationID')
            .leftOuterJoin('locations', 'shelters.fk_locationID', 'locations.locationID')     
            .leftOuterJoin('hours', 'locations.fk_hourID', 'hours.hoursID')
            .then(function(res){
              return res;
            })
            .catch(function(err){
              console.error('There was an error selecting organizations ', err);
            });
};

exports.findUserShelter = function(userId){
  return knex.select('*')
             .from('shelterManagers')
             .where('fk_userID', userId)
             .fullOuterJoin('shelters', 'shelterManagers.fk_shelterID', 'shelters.shelterID')
             .rightOuterJoin('locations', 'shelters.fk_locationID', 'locations.locationID')           
             .then(function(shelter){
                return shelter;
             });
};

// passes off to sessions at end
exports.signIn = function(reqBody){
  var user;
  //first find user by email
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
                return session;
              })
              .catch(function(err){
                console.error('there was an error ', err);
                throw err;
              });
};


//adds an existing manager to another shelter
exports.addShelter = function(req){
  var reqBody = req.body;
  var userID;
  var shelterName = {shelters: reqBody.shelters.shelterName};
  

return this.findByUserEmail(req.body)
          .then(function(resp){
            userID = resp[0].userID;
            return;
          })
          .catch(function(err){
            console.error('User does not exist', err);
            throw 'User does not exist';
          })
          .then(function(){
            //first check if the shelter already exists
            return shelterHelpers.selectShelter(shelterName);
          })
          .then(function(resp){
            if (resp.length > 0) {
              return resp;
            } else {
              throw 'no such shelter exists';
            }
          })
          .catch(function(err){
            if (err === 'User does not exist'){
              throw 'User does not exist';
            }
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
    return knex('orgAdmins')
            .update('accessApproved', true)
            .where('fk_userID', userID)
            .returning('*');
  } else {
    return knex('shelterManagers')
          .update('accessApproved', true)
          .where('fk_userID', userID)
          .returning('*');
  }
};

exports.findUserAccess = function(userID, role) {
  if (role === 'Admin'){
    return knex.select('accessApproved')
            .from('orgAdmins')
            .where('accessApproved', true)
            .andWhere('fk_userID', userID)
            .then(function(res){
              if (res[0]){
                return res;
              } else {
                throw 'User is not approved';
              }
            });
  } else if (role === 'Manager'){
    return knex.select('accessApproved')
            .from('shelterManagers')
            .where('accessApproved', true)
            .andWhere('fk_userID', userID)
            .then(function(res){
              if (res[0]){
                return res;
              } else {
                throw 'User is not approved';
              }
            });
  } else {
    //they are a public user so they don't have access
    throw 'User is not approved';
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
