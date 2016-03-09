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

var app = express();

//starts up the database and runs any migrations and seed files required
require('./../db/db');


app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(favicon(path.join(__dirname, 'client', 'favicon.png')));
app.use(express.static(path.join(__dirname, '../public')));




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
  //should return all shelters with no filtering
});

routes.post('/api/signin', function(req, res){
  //path is the same for all types of users
  //should be sending a cookie (I'm not certain how to test for that specifically though
  //I believe the tests parse out just the response body)
});

routes.post('/api/signupAdmin', function(req, res){
  //path for both creating a new orgAdmin and for creating a new organization
  //organizations can't be made without an initial admin
});

routes.post('/api/signup', function(req, res){
  //sign up for public users
});

routes.post('/api/createManager', function(req, res){
  //path for both creating a new manager for an existing shelter
  //and for creating a new shelter + manager(shelters cannot be made on their own)
  //we generate a password for this user so we need to work out a way to send them a confirmaton email 
});

routes.post('/api/addShelterManager', function(req, res){
  //path to add an existing manager as manager of another shelter
});

routes.post('/api/updateOrganization', function(req, res){
  //it should check whether the user has permission to access this route or not
  //updateOrganization only actually updates the organizations name as of right now
});

routes.post('/api/updateShelter', function(req, res){
  //should check whether user has permission
  //can update all rows of information about a shelter eg. name, contact info, etc
});

routes.post('/api/addOccupant', function(req, res){
  //should check whether user has permission
  //adds occupants to particular units
});

routes.post('/api/removeOccupant', function(req, res){
  //check permission
  //removes occupant from a particular unit
});

routes.post('/api/updateOccupant', function(req, res){
  //check permission
  //essentially just for updating the name of a occupant(misspelling or something)
});

routes.post('/api/updateTotalOccupancy', function(req, res){
  //as with the others check whether user has permission
  //updates the number of beds that the shelter actually has total
});

routes.post('/api/updateEligibility', function(req, res){
  //check permission
  //updates a shelters eligibility rules
});

routes.post('/api/deleteEligibility', function(req, res){
  //check permission
  //as it says on the tin
  //should return the rule that way deleted
});

routes.get('/api/fetchUser', function(req, res){
  //if not logged in will return nothing
  //will only return info about the user that is logged in
  //this is all the info for the profile page
});

routes.post('/api/updateUser', function(req, res){
  //check permission
  //updates password, email etc. 
  //(all of those functions work so feel free to test only one)
  //it will return the updated field
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
