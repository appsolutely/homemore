import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';
import ShelterActions from '../actions/ShelterActions';
import ShelterMap from './GoogleMapsView.js';


class ShelterProfile extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.params);
    this.state = alt.stores.ShelterStore.state;
    console.log('current State ', this.state);
  }
  componentWillMount() {
    console.log('will mount');
  }

  componentDidMount() {
    console.log('did mount');
    ShelterActions.getShelters();
    console.log('current state ', this.state);
    this.forceUpdate();
  }

  PewPew() {
    console.log('state', this.state);
  }

  render() {
    const defaultShelter = { organizationName: '',
         shelterName: '',
         locationName: '',
         shelterDaytimePhone: '',
         shelterEmergencyPhone: '',
         shelterEmail: '',
         hoursMonday: '',
         hoursTuesday: '',
         hoursWednesday: '',
         hoursThursday: '',
         hoursFriday: '',
         hoursSaturday: '',
         hoursSunday: '',
         long: 97.44,
         lat: 30.16,
       };
    const theShelter = this.state.shelters.filter((shelter) => {
      return shelter.shelterName === this.props.params.id;
    })[0] || defaultShelter;
    console.log('var should be ', theShelter);
    return (
       <div className ="well col-sm-6 col-sm-offset-3 text-left">
       <button onClick={this.PewPew.bind(this)}>click</button>
         <div className="well shelterProfile">
         <div className="bg-primary"><h3>{theShelter.organizationName}</h3></div>
          <div className="text-capitalize"><h2>{theShelter.shelterName}</h2></div>
          <div className="text-left">
          <span className="col-sm-5">at <b>{theShelter.locationName} </b>
            {theShelter.locationStreet}
            <br/>
            {theShelter.locationCity}, 
            {theShelter.locationState} 
            {theShelter.locationZip}



          </span>
          </div>
          <div className="contactInfo text-right">
            <div><h5>Daytime Phone: {theShelter.shelterDaytimePhone}</h5></div>
            <div><h5>Emergency Phone: {theShelter.shelterEmergencyPhone}</h5></div>
            <div><a href="mailto:{theShelter.shelterEmail}">{theShelter.shelterEmail}</a></div>
          </div>
          <ShelterMap
            shelters={theShelter}
          />
          <span>
          <div>
          
            <h3>
              <div className="">{theShelter.total_units} units at this location: </div>
              <br/>
              <div className="label label-danger">{theShelter.occupied_units} taken</div> 
              <div className="label label-success">{theShelter.total_units - theShelter.occupied_units} available</div>                        
            </h3>
            <br/>
          <h4>Reach them by phone @ {theShelter.locationPhone}</h4> 
          <br/>
            <h4>Hours</h4>
            <div>
              <div>Monday: {theShelter.hoursMonday}</div>
              <div>Tuesday: {theShelter.hoursTuesday}</div>
              <div>Wednesday: {theShelter.hoursWednesday}</div>
              <div>Thursday: {theShelter.hoursThursday}</div>
              <div>Friday: {theShelter.hoursFriday}</div>
              <div>Saturday: {theShelter.hoursSaturday}</div>
              <div>Sunday: {theShelter.hoursSunday}</div>
            </div>
          </div>
          </span>
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
