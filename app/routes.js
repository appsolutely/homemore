import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import ShelterList from './components/ShelterList';
import ShelterProfile from './components/ShelterProfile';
import Signup from './components/Signup';
import AdminSignup from './components/AdminSignup';
import UserSignup from './components/UserSignup';
import AdminProfile from './components/AdminProfile';
import UserProfile from './components/UserProfile';
import ManagerProfile from './components/ManagerProfile';
import Occupy from './components/Occupy';

export default (
  <Route component={App}>
    <Route path="/" component={ShelterList} />
    <Route path="/shelter" component={ShelterList} />
    <Route path="/shelter/:id" component={ShelterProfile} />
    <Route path="/signup" component={Signup} />
    <Route path="/user-signup" component={UserSignup} />
    <Route path="/admin-signup" component={AdminSignup} />
    <Route path="/admin-profile" component={AdminProfile} />
    <Route path="/manager-profile" component={ManagerProfile} />
    <Route path="/user-profile" component={UserProfile} />
    <Route path="/manager-profile/:id" component={Occupy} />
  </Route>
);
