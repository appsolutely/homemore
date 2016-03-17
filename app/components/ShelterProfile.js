import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';
import ShelterMap from './GoogleMapsView.js';


class ShelterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = alt.stores.ShelterStore.state;
  }

  render() {
    const theShelter = this.state.shelters.filter((shelter) => {
      return shelter.shelterName === this.props.params.id;
    })[0];
     console.log('var should be ', theShelter)
    return (
       <div className ="well col-sm-6 col-sm-offset-3 text-left">
         <div className="well shelterProfile">
         <div className="bg-primary"><h3>{theShelter.organizationName}</h3></div>
          <div className="text-capitalize"><h2>{theShelter.shelterName}</h2></div>
          <div className="text-left"><h4>at {theShelter.locationName}</h4></div>
          <div className="contactInfo text-right">
            <div><label>Daytime Phone:</label> {theShelter.shelterDaytimePhone}</div>
            <div><label>Emergency Phone:</label> {theShelter.shelterEmergencyPhone}</div>
            <div><a href="mailto:{theShelter.shelterEmail}">{theShelter.shelterEmail}</a></div>
          </div>
          <ShelterMap
            shelters={theShelter}
          />
          <div>
            <label>Hours</label>
            <div>
              <div>Monday {theShelter.hoursMonday}</div>
              <div>Tuesday {theShelter.hoursTuesday}</div>
              <div>Wednesday {theShelter.hoursWednesday}</div>
              <div>Thursday {theShelter.hoursThursday}</div>
              <div>Friday {theShelter.hoursFriday}</div>
              <div>Saturday {theShelter.hoursSaturday}</div>
              <div>Sunday {theShelter.hoursSunday}</div>
            </div>
       </div>
          </div>
        </div>
    );
  }
}

// fixes
ShelterProfile.propTypes = {
  params: React.PropTypes.object,
};

export default ShelterProfile;
