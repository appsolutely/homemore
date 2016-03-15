import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import ShelterList from './components/ShelterList';
import ShelterProfile from './components/ShelterProfile';
import Signup from './components/Signup';
import AdminSignup from './components/AdminSignup';
import UserSignup from './components/UserSignup';
import AdminProfile from './components/AdminProfile';
import UserProfile from './components/UserProfile';
import ManagerProfile from './components/ManagerProfile';

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/shelter" component={ShelterList} />
    <Route path="/shelterprofile/:id" component={ShelterProfile} />
    <Route path="/signup" component={Signup} />
    <Route path="/user-signup" component={UserSignup} />
    <Route path="/admin-signup" component={AdminSignup} />
    <Route path="/admin-page" component={AdminProfile} />
    <Route path="/manager-page" component={ManagerProfile} />
    <Route path="/user-profile" component={UserProfile} />
  </Route>
);
