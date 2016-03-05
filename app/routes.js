import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import ShelterList from './components/ShelterList';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/shelter' component={ShelterList} />
  </Route>
);