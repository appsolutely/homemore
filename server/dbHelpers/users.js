var db = require('../../db/db.js');
var config = require('../../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]);
// var bcrypt = require('bycrpt-as-promised');
var orgHelpers = require('./organizations.js');
var sessions = require('./sessions.js');

//check that no one else has been registered with the email before being passed here
exports.addNewPublic = function(reqBody){
  var userRoleId;
  var user = reqBody.pubUser;
  //hash password
  return selectRole('Public')  
        .then(function(result){
          userRoleId = result.userRoleID || 1;
          //hardcoded for testing purposes for now -- nothing is seeded yet
          return;
        })
        .then(function(){
          return bcrypt.hash(password, 10);
        })
        .then(function(hashed){
          return knex.insert({firstName: user.firstName,
                              lastName: user.lastName,
                              password: hashed, 
                              userEmail: user.email,
                              fk_userRole: userRoleId})
                     .into('users')
                     .returning('*');
        })
        .then(function(res){
          return res;
        });
};

// var adminUser = {adminUser: {firstName: 'Billy', lastname: 'the kid', password: 'anotherlongstring', email: 'billy@example.com'}, organizations:{orgName:'FrontSteps'}};    
exports.addNewAdmin = function(){
  var userRoleId;
  var user = reqBody.adminUser;
  var response = [];
  var org = reqBody.organizations;
  //hash password
  return selectRole('Admin')  
        .then(function(result){
          userRoleId = result.userRoleID || 2;
          //hardcoded for testing purposes for now -- nothing is seeded yet
          return;
        })
        .then(function(){
          return bcrypt.hash(password, 10);
        })
        .then(function(hashed){
          return knex.insert({firstName: user.firstName,
                              lastName: user.lastName,
                              password: hashed, 
                              userEmail: user.email,
                              fk_userRole: userRoleId})
                     .into('users')
                     .returning('*');
        })
        .then(function(res){
          response.concat(res);
          var userID = res[0].userID;
          return;
        })
        .then(function(){
          return orgHelpers.selectOrganization(org.orgName);
        })
        .then(function(result){
          if (result.length > 0){
            return result;
          } else {
            throw new Error('No such Organization');
          }
        })
        .catch(function(resp){
          if (Error.message === 'No such Organization'){
            return orgHelpers.insertOrganization(org);
          } else {
            console.error('Error in new Admin ', resp);
          }
        })
        .then(function(resp){
          //either a new organization or an existing one
            var orgId = resp[0].organizationID;
            return knex.insert({fk_userID: userID,
                                fk_organizationID: orgId})
                        .into('orgAdmins')
                        .returning('*');
        })
        .then(function(res){
          return response.concat(res);
        });
};

//requires -- req.body and userID from the session
exports.updateUser = function(reqBody, userId){
  var password = reqBody.user.password;
  var firstname = reqBody.user.firstName;
  var lastname = reqBody.user.lastName;
  var mainEmail = reqBody.user.email;
  var managerEmail = reqBody.user.managerEmail;

  if (password.length > 0){
    //hash new password and update
    return bcrypt.hash(password, 10)
          .then(function(hashed){
            knex('users')
                .where(userID, userId)
                .update({password: hashed})
                .returning('*');
          })
          .then(function(res){
            return res;
          });
  } else if (mainEmail.length > 0){
    //first check if email is already being used
    //then update
    return this.findByUserEmail(email)
        .then(function(res){
          if (res.length > 0) {
            throw new Error('Email is already in use');
          } else {
            knex('users')
                .where(userID, userId)
                .update({email: mainEmail})
                .returning('*');
          }
        })
        .then(function(res){
          return res;
        });
  } else if (firstname.length > 0){
    return knex('users')
        .where(userID, userId)
        .update({firstName: firstname})
        .returning('*')
        .then(function(res){
          return res;
        });
  } else if (lastname.length > 0){
    return knex('users')
        .where(userID, userId)
        .update({lastName: lastname})
        .returning('*')
        .then(function(res){
          return res;
        });    
  } else if (managerEmail.length > 0){
    //not sure if this will exist yet
    //manager table currently in flux
  } else {
    throw new Error('Nothing provided to update');
  }
};

//pass in just the userId
exports.findByUserID = function(userId){
  return knex.select('*')
      .from('users')
      .where(userID, userId)
      .then(function(res){
        return res;
      });
};

//pass in just the email
exports.findByUserEmail = function(email){
  return knex.select('*')
              .from('users')
              .where(userEmail, email)
              .then(function(res){
                return res;
              });
};

//will return only the userRoleName
exports.findUserRole = function(userId){
  //first find the user
  return this.findByUserID(userId)
      .then(function(res){
        return knex.select('*')
                   .from('userRoles')
                   .where(userRoleID, res[0].fk_userRole);
      })
      .then(function(res){
        return res[0].userRoleName;
      });
};

// will return the name of their organizations
exports.findUserOrganization = function(userId){
  return this.findByUserID(userId)
      .then(function(res){
        return knex.select('*')
                   .from('organizations')
                   .where(organizationID, res[0].fk_organizationID);
      })
      .then(function(res){
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

//find the UserRoleID for insertion purposes
var selectRole = function(role){
  return knex.select('userRoleID')
             .from('userRoles')
             .where(userRoleName, role)
             .then(function(result){
              return result[0];
             });
};

