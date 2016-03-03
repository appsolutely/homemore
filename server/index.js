var express = require('express');
var Path = require('path');
var routes = express.Router();
require('./../db/bookshelf');

var assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));







//should always be the last route 
//-- default route when unknown passed in
routes.get('/*', function(req, res){
  //placeholder default file to send to the client
  res.sendFile(assetFolder + '/index.html');
});

//if the process is anythign other than test create a real server
if (process.env.NODE_ENV !== 'test') {
  var app = express();

  //parse the incoming body
  app.use(require('body-parser').json());

  //set up main router with the above routes
  app.use('/', routes);

  //start server
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log("Listening on port ", port);
} else {
  //else we are in testing mode so export routes for testing
  module.exports = routes;
}
