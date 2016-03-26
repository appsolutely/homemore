import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import ShelterList from './components/ShelterList';
import ShelterProfile from './components/ShelterProfile';
import AdminSignup from './components/AdminSignup';
import AdminProfile from './components/AdminProfile';
import UserProfile from './components/UserProfile';
import ManagerProfile from './components/manageshelter/ManagerProfile';
import ManageOccupants from './components/manageshelter/ManageOccupants';

export default (
  <Route component={App}>
    <Route path="/" component={ShelterList} />
    <Route path="/shelter" component={ShelterList} />
    <Route path="/shelter/:id" component={ShelterProfile} />
    <Route path="/admin-signup" component={AdminSignup} />
    <Route path="/add-shelter" component={AdminProfile} />
    <Route path="/manage-shelters" component={ManagerProfile} />
    <Route path="/user-profile" component={UserProfile} />
    <Route path="/manage-shelters/:id" component={ManageOccupants} />
  </Route>
);
