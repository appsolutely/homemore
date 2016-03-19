import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';
import ShelterActions from '../actions/ShelterActions';
import ShelterStore from '../stores/ShelterStore';
import ShelterMap from './GoogleMapsView.js';


class ShelterProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = ShelterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ShelterStore.listen(this.onChange);
    ShelterActions.getShelters();
  }

  onChange(state) {
    this.setState(state);
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
         long: -97.7375,
         lat: 30.2679,
       };
    const theShelter = this.state.shelters.filter((shelter) => {
      return shelter.shelterID == this.props.params.id;
    })[0] || defaultShelter;
    const location = { lat: theShelter.lat, lng: theShelter.long };
    console.log('the shelter ',typeof this.props.params.id);
    console.log('shelters are', this.state.shelters)
    return (
       <div className ="well col-sm-6 col-sm-offset-3 text-left">
         <div className="well shelterProfile">
         <div className="bg-primary"><h3>{theShelter.organizationName}</h3></div>
          <div className="text-capitalize"><h2>{theShelter.shelterName}</h2></div>
          <div className="text-left">
          <span className="col-sm-5">at <b>{theShelter.locationName} </b>
            {theShelter.locationStreet}
            <br />
            {theShelter.locationCity},
            {theShelter.locationState}
            {theShelter.locationZip}

          </span>
          </div>
          <div className="contactInfo text-right">
            <h4>Contact this shelter</h4>
            <div><h5>Daytime {theShelter.shelterDaytimePhone} <span className="glyphicon glyphicon-phone-alt"></span> </h5></div>
            <div><h5>Emergency {theShelter.shelterEmergencyPhone} <span className="glyphicon glyphicon-phone-alt"></span> </h5></div>
            <div> <a href="mailto:{theShelter.shelterEmail}">{theShelter.shelterEmail}</a> <span className="glyphicon glyphicon-envelope"> </span></div>
          </div>
          <ShelterMap
            shelters={location}
          />
          <span>
          <div>
            <h3>
              <div className="">{theShelter.total_units} units at this location: </div>
              <br />
              <div className="label label-danger">{theShelter.occupied_units} taken</div>
              <div className="label label-success">
              {theShelter.total_units - theShelter.occupied_units} available</div>
            </h3>
   
            <h4>Contact {theShelter.locationName}</h4>

          <h5>{theShelter.locationPhone} <span className="glyphicon glyphicon-phone-alt"></span></h5>
  
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
