require('babel-register');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var appRoutes = require('../app/routes');
var swig = require('swig');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');

//dbHelpers
var shelters = require('./dbHelpers/shelters.js');
var users = require('./dbHelpers/users.js');
var sessions = require('./dbHelpers/sessions.js');
var organizations = require('./dbHelpers/organizations.js');
var google = require('./googleMapsHelpers.js');


var app = express();

//starts up the database and runs any migrations and seed files required
require('./../db/db');

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(favicon(path.join(__dirname, 'client', 'favicon.png')));
app.use(express.static(path.join(__dirname, '../public')));


//parse the cookie to check for a session
app.use(cookieParser());

//if there is a cookie find the userID associated with it
app.use(function (req, res, next) {
  var session, role;
  if (req.cookies.sessionId) {
    console.log('inside');
    return sessions.findSession(req.cookies.sessionId)
        .then(function(resp) {
          session = resp;
          req.session = session[0];
          return users.findUserRole(session[0].fk_userID);
        })
        .then(function(userRole){
          role = userRole;
          return users.findUserAccess(session[0].fk_userID, role);
        })
        .then(function(){
          req.session.permissionLevel = role;
          if (role === 'Admin') {
            return users.findUserOrganization(req.session.fk_userID)
                        .then(function(result){
                          req.session.permissionOrg = result[0].organizationName;
                          next();
                        });
          } else if (role === 'Manager') {
            return users.findUserShelter(req.session.fk_userID)
                        .then(function(result){
                          req.session.permissionShelter = result[0].shelterName;
                          next();
                        });
          } else {
            //they are a public user
            console.log('public');
            next();
          }
        })
        .catch(function(err){
          if (err === 'User is not approved') {
            //the user is logged in but they haven't yet been approved 
            //so continue as public user
            console.log('not approved');
            next();
          } else {
            console.error('Unknown error in permissions ', err);
            next();
          }
        });
  } else {
    // No session to fetch so continue
    next();
  }
});


/*
// - All Information routes will return an array
// - if there is content to return it will have objects inside
// - the names of those objects can typically be found inside of the db test files -JCB
*/


app.get('/api/austin/shelters', function(req, res){
  //returns all shelters and associated data with no filtering
  return shelters.selectAllShelters()
        .then(function(shelters){
          return res.status(200).send(shelters);
        })
        .catch(function(err){
          return res.status(500).send({error: 'Service Error finding all Shelters ' + err});
        });
});

app.post('/api/signin', function(req, res){
  //path is the same for all types of users
  return users.signIn(req.body)
              .then(function(session){
                console.log('session ', session.sessionId);
                res.setHeader('Set-Cookie', 'sessionId=' + session.sessionId + '; path=/');
                return users.findByUserID(session.fk_userID);
              })
              .then(function(user){
                delete user[0].userPassword;
                res.status(201).send({success: 'User signed in', user: user[0]});
              })
              .catch(function(err){
                console.log('error in signin ', err);
                res.status(400).send({error: 'Incorrect username or password', message: err.message});
              });
});


app.post('/api/signupAdmin', function(req, res){
  var newUser;
  //path for both creating a new orgAdmin and for creating a new organization
  //organizations can't be made without an initial admin
  return users.addNewAdmin(req.body)
              .then(function(resp){
                newUser = resp;
                return sendGeneralSignUpEmail(newUser[0].user, res);
              })
              .then(function(){
                return sendOrgConfirmEmail(newUser[0].user, res);
              })
              .then(function(info){
                res.status(201).send({success: 'New admin created', user: newUser[0].user, info: info});
              })
              .catch(function(err){
                console.log(err);
                res.status(400).send({error: 'There was an error creating account, ' + err.message, message: err});
              });
});

app.post('/api/signup', function(req, res){
  var newUser;
  //sign up for public users
  return users.addNewPublic(req.body)
              .then(function(newPublic){
                newUser = newPublic;
                return sendGeneralSignUpEmail(newPublic[0], res);
              })
              .then(function(info){
                res.status(201).send({success: 'New Public user created', user: newUser[0], info: info});
              })
              .catch(function(err){
                console.error(err);
                res.status(400).send({error: 'There was an error creating accout, ' + err.message, content: err});
              });
});

app.post('/api/createManager', function(req, res){
  //path for both creating a new manager for an existing shelter
  //and for creating a new shelter + manager(shelters cannot be made on their own)
  //we generate a password for this user so we need to work out a way to send them a confirmaton email
  console.log('inside createmanager ', req.body);
  var newUser;
  if (req.session){
    if (req.session.permissionLevel === 'Admin' && req.session.permissionOrg === req.body.organizations.orgName){
      return users.addNewManager(req.body)
              .then(function(newManager){
                console.log('newManager', newManager);
                newUser = newManager;
                //path for now -- add sending email here or on front end?
                return sendManagerEmail(newManager[0], res);
              })
              .then(function(info){
                res.status(201).send({success: 'New Manager created', user: newUser, message: 'Email has been sent to confirm', info: info});
              })
              .catch(function(err){
                console.log('err', err);
                res.status(400).send({error: 'There was an error creating account, email probably already in use ' + err});
              });
    } else {
      res.status(401).send({error: 'User does not have permission for this action'});
    }
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/addShelterManager', function(req, res){
  //path to add an existing manager as manager of another shelter
  if (req.session) {
    if (req.session.permissionLevel === 'Admin' && req.session.permissionOrg === req.body.organizations.orgName){
        users.addShelter(req)
            .then(function(updated){
              res.status(201).send(updated);
            })
            .catch(function(err){
              res.status(500).send({error: 'There was an error updating data ' + err});
            });
          } else {
            res.status(401).send({error: 'User does not have permission for this action'});
          }
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/updateOrganization', function(req, res){
  //it should check whether the user has permission to access this route or not
  //updateOrganization only actually updates the organizations name as of right now
  if (req.session) {
    if (req.session.permissionLevel === 'Admin' && req.session.permissionOrg === req.body.organizations.orgName){
      return organizations.updateOrganization(req.body)
            .then(function(updates){
              res.status(201).send(updates);
            })
            .catch(function(err){
              res.status(500).send({error: 'There was an error changing data ' + err});
            });
          } else {
            res.status(401).send({error: 'User does not have permission for this action'});
          }
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/updateShelter', function(req, res){
  //should check whether user has permission
  //can update all rows of information about a shelter eg. name, contact info, etc
  if (req.session) {
    if ((req.session.permissionLevel === 'Admin' && req.session.permissionOrg === req.body.organizations.orgName) ||
      (req.session.permissionLevel === 'Manager' && req.session.permissionShelter === req.body.shelters.shelterName)){
        return shelters.updateShelter(req.body)
                .then(function(updates){
                  res.statu(201).send(updates);
                })
                .catch(function(err){
                  res.status(500).send({error: 'There was an error changing data ' + err});
                });
    } else {
      res.status(401).send({error: 'User does not have permission for this action'});
    }
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/addOccupant', function(req, res){
  //should check whether user has permission
  //adds occupants to particular units
  if (req.session) {
    if ((req.session.permissionLevel === 'Admin' && req.session.permissionOrg === req.body.organizations.orgName) ||
      (req.session.permissionLevel === 'Manager' && req.session.permissionShelter === req.body.shelters.shelterName)){
      return shelters.insertShelterOccupancy(req.body)
            .then(function(occupant){
              res.status(201).send(occupant);
            })
            .catch(function(err){
              res.status(500).send({error: 'There was an error inserting data ' + err });
            });
    } else {
      res.status(401).send({error: 'User does not have permission for this action'});
    }
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/removeOccupant', function(req, res){
  //check permission
  //removes occupant from a particular unit
  if (req.session) {
    if ((req.session.permissionLevel === 'Admin' && req.session.permissionOrg === req.body.organizations.orgName) ||
      (req.session.permissionLevel === 'Manager' && req.session.permissionShelter === req.body.shelters.shelterName)){
      return shelters.deleteShelterOccupancy(req.body)
              .then(function(deleted){
                res.status(201).send(deleted);
              })
              .catch(function(err){
                res.status(500).send({error: 'There was an error deleting data ' + err});
              });
    } else {
      res.status(401).send({error: 'User does not have permission for this action'});
    }
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/updateOccupant', function(req, res){
  //check permission
  //essentially just for updating the name of a occupant(misspelling or something)
  if (req.session) {
    if ((req.session.permissionLevel === 'Admin' && req.session.permissionOrg === req.body.organizations.orgName) ||
      (req.session.permissionLevel === 'Manager' && req.session.permissionShelter === req.body.shelters.shelterName)){
      return shelters.updateShelterOccupancy(req.body)
            .then(function(updated){
              res.status(201).send(updated);
            })
            .catch(function(err){
              res.status(500).send({error: 'There was an error changing data ' + err});
            });
    } else {
      res.status(401).send({error: 'User does not have permission for this action'});
    }
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/updateOccupantUnit', function(req, res){
  if (req.session) {
    if ((req.session.permissionLevel === 'Admin' && req.session.permissionOrg === req.body.organizations.orgName) ||
      (req.session.permissionLevel === 'Manager' && req.session.permissionShelter === req.body.shelters.shelterName)){
      return shelters.updateOccupancyUnit(req.body)
            .then(function(updated){
              res.status(201).send(updated);
            })
            .catch(function(err){
              res.status(500).send({error: 'There was an error changing data ' + err});
            });
    } else {
      res.status(401).send({error: 'User does not have permission for this action'});
    }
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/addShelterUnit', function(req, res){
  //as with the others check whether user has permission
  //updates the number of beds that the shelter actually has total
  if (req.session) {
    if ((req.session.permissionLevel === 'Admin' && req.session.permissionOrg === req.body.organizations.orgName) ||
      (req.session.permissionLevel === 'Manager' && req.session.permissionShelter === req.body.shelters.shelterName)){
      return shelters.insertShelterUnit(req.body)
            .then(function(unit){
              res.status(201).send(unit);
            })
            .catch(function(err){
              res.status(500).send({error: 'There was an error adding data ' + err});
            });
    } else {
     res.status(401).send({error: 'User does not have permission for this action'});
    }
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/updateEligibility', function(req, res){
  //check permission
  //updates a shelters eligibility rules
  if (req.session) {
    if ((req.session.permissionLevel === 'Admin' && req.session.permissionOrg === req.body.organizations.orgName) ||
      (req.session.permissionLevel === 'Manager' && req.session.permissionShelter === req.body.shelters.shelterName)){
    return shelters.insertShelterEligibility(req.body)
            .then(function(eligibility){
              res.status(201).send(eligibility);
            })
            .catch(function(err){
              res.status(500).send({error: 'There was an error inserting data ' + err});
            });
    } else {
     res.status(401).send({error: 'User does not have permission for this action'});
    }
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/deleteEligibility', function(req, res){
  //check permission
  //as it says on the tin
  //should return the rule that way deleted
  if (req.session) {
    if ((req.session.permissionLevel === 'Admin' && req.session.permissionOrg === req.body.organizations.orgName) ||
      (req.session.permissionLevel === 'Manager' && req.session.permissionShelter === req.body.shelters.shelterName)){
    return shelters.deleteShelterEligibility(req.body)
              .then(function(deleted){
                res.status(201).send(deleted);
              })
              .catch(function(err){
                res.status(500).send({error: 'There was an error deleting data ' + err});
              });
    } else {
     res.status(401).send({error: 'User does not have permission for this action'});
    }
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.get('/api/fetchUser', function(req, res){
  //if not logged in will return nothing
  //will only return info about the user that is logged in
  //this is all the info for the profile page -- not any shelter or related info
  if (req.session) {
    console.log('inside fetchUser ', req.session.fk_userID);
    return users.findByUserID(req.session.fk_userID)
          .then(function(user){
            res.status(200).send(user);
          });
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/updateUser', function(req, res){
  //check permission
  //updates password, email etc.
  //(all of those functions work so feel free to test only one)
  //it will return the updated field
  if (req.session) {
    users.updateUser(req)
          .then(function(changes){
            res.status(201).send(changes);
          })
          .catch(function(err){
              res.status(500).send({error: 'There was an error changing data'});
          });
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

app.post('/api/logout', function(req, res){
  return sessions.logout(req.session.sessionID)
          .then(function(){
            res.setHeader('Set-Cookie', 'sessionId=' + null);
            res.status(201).send({success: 'User has been signed out'});
          });
});

app.post('/api/approve', function(req, res){
  var userID;
  console.log('in approve');
  console.log('reqBody', req.body);
  if (req.body.permission === 'JCB'){
    return users.findByUserEmail(req.body)
          .then(function(user){
            userID = user[0].userID;
            return users.findUserRole(userID);
          })
          .then(function(role){
            return users.setAccessTrue(userID, role);
          })
          .then(function(result){
            res.status(201).send({success: 'User has been approved', user: result});
          })
          .catch(function(err){
            console.error('Error in approving user ', err);
            res.status(500).send({error: 'Service error approving user', message: err.message});
          });
    } else {
      res.status(401).send('You need permission for this action');
    }
});

/*
EMAIL SETUP
*/

//the email our messages are sent from
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: ' appsolutelysheltered@gmail.com',
    pass: "eg&4{jeEDL^RS'x%"
  }
});

//ourEmail
var ourEmail = 'appsolutelysheltered@gmail.com';

//function to actually send off the email returns a promise
var sendEmail = function(mailOptions, res){
  return transporter.sendMail(mailOptions, function(err, info){
    return new Promise(function(resolve, reject){
      if (process.env.NODE_ENV === 'test'){
        resolve();
      }
      if (err){
        console.log(err);
        res.json({yo: 'error'});
      } else {
        console.log('Message sent: ' + info.response);
        resolve(info);
      }
    });
  });
};

//functions to call to actually send the emails
var sendGeneralSignUpEmail = function(user, res) {
  console.log('inside send email general ', user);
  var text = 'A new account has been created with this email on Sheltered. \n\n Welcome from the Sheltered Team!';
  var mailOptions = {
    from: ourEmail,
    to: user.userEmail,
    subject: 'Account Created On Sheltered',
    text: text
  };
return sendEmail(mailOptions, res);
};

//new manager has been created send them their generated password
var sendManagerEmail = function (manager, res) {
  console.log('inside send email ', manager);
  var text = 'A new account has been created for you on Sheltered. \n\n The password ' + manager.genPass +
   ' has been randomly generated for you. \n\n Please head to sheltered.herokuapp.com and change it. \n\n Welcome from the Appsolutely Team!';
  var mailOptions = {
    from: ourEmail,
    to: manager.user.userEmail,
    subject: 'Account Created On Sheltered',
    text: text
  };
  return sendEmail(mailOptions);
};

//if Org does not already exist email us
var sendOrgConfirmEmail = function(org, res){
  var text = 'A new account has been created on Sheltered for a new organization by userID ,'+ org.userID + '. \n\n Please go to sheltered.herokuapp.com to confirm the new user. \n\n Welcome from the Sheltered Team!';
  var mailOptions = {
    from: ourEmail,
    to: ourEmail,
    subject: 'Account Created On Sheltered'
  };
};

//if Org does exist email to an existing admin
var sendAdminConfirmEmail = function(org, res){
  var text = 'A new account has been created on Sheltered for ' + org.organizationName +
  '. \n\n Please go to sheltered.herokuapp.com to confirm the new user. \n\n Welcome from the Sheltered Team!';
  var mailOptions = {
    from: ourEmail,
    to: org.email,
    subject: 'Account Created On Sheltered'
  };
};


app.post('/api/getGeocode', function(req, res){
  return google.findGeolocation(req.body)
            .then(function(resp){
              res.status(200).send(resp[0]);
            });
});

//server side rendering - front end needs this
app.use(function(req, res) {
 Router.match({ routes: appRoutes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    console.log(req.url);
   if (err) {
     res.status(500).send(err.message);
   } else if (redirectLocation) {
     res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
   } else if (renderProps) {
       var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
       var page = swig.renderFile('views/index.html', { html: html });
       res.status(200).send(page);
   } else {
     res.status(404).send('Page Not Found');
   }
 });
});


//if the process is anythign other than test create a real server
if (process.env.NODE_ENV !== 'test') {
  //start server
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log("Listening on port ", port);
} else {
  //else we are in testing mode so export routes for testing
  module.exports = app;
}
