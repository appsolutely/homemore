var React = require('react')
var Route = require('react-router');
var App = require('./components/App');
var Home = require('./components/Home');

exports.default = {
 <Route component = {App}>
    <Route path='/' component = {Home} />
  </Route>

}
