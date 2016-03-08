var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);
var bcrypt = require('bcrypt-as-promised');
var orgHelpers = require('./organizations.js');
var sessions = require('./sessions.js');

//check that no one else has been registered with the email before being passed here
exports.addNewPublic = function(reqBody){
  var userRoleId;
  var userID;
  var user = reqBody.pubUser;
  //hash password
  return selectRole('Public')  
        .then(function(result){
          // console.log('result after selectRole ', result);
          userRoleId = result[0].userRoleID;
          return;
        })
        .then(function(){
          return bcrypt.hash(user.password, 10);
        })
        .then(function(hashed){
          return knex.insert({userFirstName: user.firstName,
                              userLastName: user.lastName,
                              userPassword: hashed, 
                              userEmail: user.email,
                              fk_userRole: userRoleId})
                     .into('users')
                     .returning('*');
        })
        .then(function(result){
          // console.log('result of new public user ', result);
          return result;
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
          return bcrypt.hash(user.password, 10);
        })
        .then(function(hashed){
          //then create the new user
          return knex.insert({userFirstName: user.firstName,
                              userLastName: user.lastName,
                              userPassword: hashed, 
                              userEmail: user.email,
                              fk_userRole: userRoleId})
                     .into('users')
                     .returning('*');
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

//requires -- req.body and req.session.userID
exports.updateUser = function(reqBody, userId){
  var password = reqBody.user.password || '';
  var firstname = reqBody.user.firstName || '';
  var lastname = reqBody.user.lastName || '';
  var mainEmail = reqBody.user.email || '';
  var managerEmail = reqBody.user.managerEmail || '';

  if (password.length > 0){
    //hash new password and update
    console.log('inside update password');
    return bcrypt.hash(password, 10)
          .then(function(hashed){
          return knex('users')
                .update('userPassword', hashed)
                .returning('userID')
                .where('userID', userId);
          })
          .then(function(result){
            console.log('response from update password ', result);
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
          console.log('checked if email is in use ', res);
          if (res.length > 0) {
            throw new Error('Email is already in use');
          } else {
            return knex('users')
                .update('userEmail', mainEmail)
                .returning('*')
                .where('userID', userId)
              .then(function(res){
                console.log('result from newEmail ', res);
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
        console.log('returned from select ', result);
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
                console.log('retured from select email ', result);
                return result;
              });
};

//will return only the userRoleName
exports.findUserRole = function(userId){
  //first find the user
  console.log('userId passed into userRole ', userId);
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
  return this.findByUserID(userId)
      .then(function(res){
        return selectAdminInfo(res[0].userID);
      })
      .then(function(res){
        return knex.select('*')
                   .from('organizations')
                   .where('organizationID', res[0].fk_organizationID);
      })
      .then(function(res){
        console.log('response from select organization ', res);
        return res;
      });
};

// passes off to sessions at end
exports.signIn = function(reqBody, res){
  //first find user by email
  return this.findByUserEmail(reqBody.user.email)
              .then(function(result){
                if (result.length > 0){
                  return result[0];
                } else {
                  throw new Error('User does not exist');
                }
              })
              .catch(function(err){
                if (err.message === 'User does not exist') {
                  return {error: 'User does not exist'};
                } else {
                  return {error: 'unknown error in signin'};
                }
              })
              .then(function(user){
                return bcrypt.compare(user.password, reqBody.user.password);
              })
              .catch(function(err){
                //password does not match
                return {error: 'Password incorrect'};
              })
              .then(function(){
                //password correct
                return sessions.createNewSession(user.userID, res);
              });
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

