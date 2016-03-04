require('babel-register')
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = express.Router();
var React = require('react')
var ReactDOM = require('react-dom/server')
var Router = require('react-router')
var appRoutes = require('../app/routes')
var swig = require('swig')

var app = express();

//require('./../db/db');

//path to client folder
var assetFolder = path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

//server side rendering - front end needs this
app.use(function(req, res) {
 Router.match({ routes: appRoutes.default, location: req.url }, function(err, redirectLocation, renderProps) {
   if (err) {
     res.status(500).send(err.message)
   } else if (redirectLocation) {
     res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
   } else if (renderProps) {
       var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
       var page = swig.renderFile('client/index.html', { html: html });
       res.status(200).send(page);
   } else {
     res.status(404).send('Page Not Found')
   }
 });
});





//should always be the last route
//-- default route when unknown passed in
routes.get('/*', function(req, res){
  //placeholder default file to send to the client
  res.sendFile(assetFolder + '/index.html');
});

//if the process is anythign other than test create a real server
if (process.env.NODE_ENV !== 'test') {


  //parse the incoming body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));


  //if you're having routing problems, look here first  VVVVVVVV
  //app.use(express.static(path.join(__dirname, 'public')));
  //set up main router with the above routes
  app.use('/', routes);

  //if you're having routing problems, look above

  //start server
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log("Listening on port ", port);
} else {
  //else we are in testing mode so export routes for testing
  module.exports = routes;
}
