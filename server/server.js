require('babel-register');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var routes = express.Router();
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var appRoutes = require('../app/routes');
var swig = require('swig');

//dbHelpers
var shelters = require('./dbHelpers/shelters.js');
var users = require('./dbHelpers/users.js');
var sessions = require('./dbHelpers/sessions.js');
var organizations = require('./dbHelpers/organizations.js');


var app = express();

//starts up the database and runs any migrations and seed files required
require('./../db/db');


app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(favicon(path.join(__dirname, 'client', 'favicon.png')));
app.use(express.static(path.join(__dirname, '../public')));


//parse the cookie to check for a session
app.use(cookieParser());

//if there is a cookie find the userID associated with it
app.use(function (req, res, next) {
  if (req.cookies.sessionId) {
    return sessions.findSession(req.cookies.sessionId)
        .then(function(session) {
          req.session = session;
          next();
    });
  } else {
    // No session to fetch; continue
    next();
  }
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

routes.get('/api/test', function(req, res){
  return res.status(200).send(['YAY']);
});


/* 
// - All Routes will return an array 
// - if there is content to return it will have objects inside
// - the names of those objects can typically be found inside of the db test files -JCB
*/


routes.get('/api/austin/shelters', function(req, res){
  //returns all shelters and associated data with no filtering
  return shelters.selectAllShelters(req.body)
        .then(function(shelters){
          return res.status(200).send(shelters);
        })
        .catch(function(err){
          return res.status(500).send({error: 'Service Error finding all Shelters ' + err});
        });
});

routes.post('/api/signin', function(req, res){
  //path is the same for all types of users
  return users.signIn(req.body)
              .then(function(sessionId){
                res.setHeader('Set-Cookie', 'sessionId=' + sessionId);
                res.status(200).send({success: 'User signed in'});
              })
              .catch(function(err){
                res.status(400).send({error: 'Incorrect username or password', message: err.message});
              });
});

routes.post('/api/signupAdmin', function(req, res){
  //path for both creating a new orgAdmin and for creating a new organization
  //organizations can't be made without an initial admin
  return users.addNewAdmin(req.body)
              .then(function(newAdmin){
                res.status(201).send({success: 'New admin created', user: newAdmin});
              })
              .catch(function(err){
                res.status(400).send({error: 'There was and error creating account, email probably already in use ' + err});
              });
});

routes.post('/api/signup', function(req, res){
  //sign up for public users
  return users.addNewPublic(req.body)
              .then(function(newPublic){
                res.status(201).send({success: 'New Public user created', user: newPublic});
              })
              .catch(function(err){
                res.status(400).send({error: 'There was an error creating accout, email probably already in use ' + err});
              });
});

routes.post('/api/createManager', function(req, res){
  //path for both creating a new manager for an existing shelter
  //and for creating a new shelter + manager(shelters cannot be made on their own)
  //we generate a password for this user so we need to work out a way to send them a confirmaton email
  return users.addNewManager(req.body)
              .then(function(newManager){
                //path for now -- add sending email here or on front end?
                res.status(201).send({success: 'New Manager created', user: newManager, message: 'Email will be sent to confirm account creation'});
              })
              .catch(function(err){
                res.status(400).send({error: 'There was an error creating account, email probably already in use ' + err});
              });
});

routes.post('/api/addShelterManager', function(req, res){
  //path to add an existing manager as manager of another shelter
  //this has not yet been implemented...
  if (req.session) {
    //NEED TO ADD THIS
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

routes.post('/api/updateOrganization', function(req, res){
  //it should check whether the user has permission to access this route or not
  //updateOrganization only actually updates the organizations name as of right now
  if (req.session) {
    return organizations.updateOrganization(req.body)
            .then(function(updates){
              res.status(201).send(updates);
            })
            .catch(function(err){
              res.status(400).send({error: 'There was an error changing data ' + err});
            });
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

routes.post('/api/updateShelter', function(req, res){
  //should check whether user has permission
  //can update all rows of information about a shelter eg. name, contact info, etc
  if (req.session) {
    return shelters.updateShelter(req.body)
            .then(function(updates){
              res.statu(201).send(updates);
            })
            .catch(function(err){
              res.status(400).send({error: 'There was an error changing data ' + err});
            });
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

routes.post('/api/addOccupant', function(req, res){
  //should check whether user has permission
  //adds occupants to particular units
  if (req.session) {
    return shelters.insertShelterOccupancy(req.body)
            .then(function(occupant){
              res.status(201).send(occupant);
            })
            .catch(function(err){
              res.status(400).send({error: 'There was an error inserting data ' + err });
            });
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

routes.post('/api/removeOccupant', function(req, res){
  //check permission
  //removes occupant from a particular unit
  if (req.session) {
    return shelters.deleteShelterOccupancy(req.body)
              .then(function(deleted){
                res.status(201).send(deleted);
              })
              .catch(function(err){
                res.status(400).send({error: 'There was an error deleting data ' + err});
              });
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

routes.post('/api/updateOccupant', function(req, res){
  //check permission
  //essentially just for updating the name of a occupant(misspelling or something)
  if (req.session) {
    return shelters.updateShelterOccupancy(req.body)
            .then(function(updated){
              res.status(201).send(updated);
            })
            .catch(function(err){
              res.status(400).send({error: 'There was an error changing data ' + err});
            });
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

routes.post('/api/addShelterUnit', function(req, res){
  //as with the others check whether user has permission
  //updates the number of beds that the shelter actually has total
  if (req.session) {
    return shelters.insertShelterUnit(req.body)
            .then(function(unit){
              res.status(201).send(unit);
            })
            .catch(function(err){
              res.status(400).send({error: 'There was an error adding data ' + err});
            });
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

routes.post('/api/updateEligibility', function(req, res){
  //check permission
  //updates a shelters eligibility rules
  if (req.session) {

  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

routes.post('/api/deleteEligibility', function(req, res){
  //check permission
  //as it says on the tin
  //should return the rule that way deleted
  if (req.session) {

  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

routes.get('/api/fetchUser', function(req, res){
  //if not logged in will return nothing
  //will only return info about the user that is logged in
  //this is all the info for the profile page -- not any shelter or related info
  if (req.session) {
    return users.findByUserID(req.session.userID)
          .then(function(user){
            res.status(200).send(user);
          });
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});

routes.post('/api/updateUser', function(req, res){
  //check permission
  //updates password, email etc. 
  //(all of those functions work so feel free to test only one)
  //it will return the updated field
  if (req.session) {
    users.updateUser(req.body)
          .then(function(changes){
            res.status(201).send(changes);
          })
          .catch(function(err){
              res.status(400).send({error: 'There was an error changing data'});
          });
  } else {
    res.status(401).send({error: 'User is not currently signed in'});
  }
});


//if the process is anythign other than test create a real server
if (process.env.NODE_ENV !== 'test') {
  //start server
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log("Listening on port ", port);
} else {
  //else we are in testing mode so export routes for testing
  module.exports = routes;
}
