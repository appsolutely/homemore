import React from 'react';
import ShelterActions from '../../actions/ShelterActions';
import ShelterStore from '../../stores/ShelterStore';
import ShelterMap from '../GoogleMapsView.js';
import memoize from '../../helpers.js';

// I am a sibling component to ShelterList - this is why I have state
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
      // should return array
    const theShelter = (shelterID) => {
      return this.state.shelters.filter((shelter) => {
        return shelter.shelterID == shelterID;
      })[0];
    };
    const aShelter = memoize(theShelter);
    const finalShelter = aShelter(this.props.params.id)//[0] || defaultShelter;
    console.log(finalShelter)
    // const theShelter = this.state.shelters.filter((shelter) => {
    //   return shelter.shelterID == this.props.params.id;
    // })[0] || defaultShelter;
    const location = { lat: finalShelter.lat, lng: finalShelter.long };
    return (
      <div className ="well col-sm-6 col-sm-offset-3 text-left">
        <div className="well shelterProfile">
          <div className="bg-primary">
            <h3>
              {finalShelter.organizationName}
            </h3>
          </div>
          <div className="text-capitalize">
            <h2>
              {finalShelter.shelterName}
            </h2>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div>at <b>{finalShelter.locationName} </b>
              <br />
                {finalShelter.locationStreet}
              </div>
              <div>
                <div>
                  {finalShelter.locationCity},
                  {finalShelter.locationState}
                </div>
                <div>
                  {finalShelter.locationZip}
                </div>
              </div>
            </div>
            <div className="contactInfo col-sm-6">
              <h4>Contact this shelter</h4>
              <span>
                <div>
                  <span className="glyphicon glyphicon-phone-alt"></span>
                    Daytime: {finalShelter.shelterDaytimePhone}
                </div>
                <div>
                  <span className="glyphicon glyphicon-phone-alt"></span>
                    Emergency: {finalShelter.shelterEmergencyPhone}
                </div>
                <div>
                  <span className="glyphicon glyphicon-envelope"></span>
                    Email: <a href="mailto:{finalShelter.shelterEmail}">{finalShelter.shelterEmail}</a>
                </div>
              </span>
            </div>
          </div>
          <ShelterMap shelters={location} />
          <span>
            <div>
              <h3>
                <div>{finalShelter.total_units} units at this location: </div>
                <br />
                <div className="label label-danger">{finalShelter.occupied_units} taken</div>
                <div className="label label-success">
                {finalShelter.total_units - finalShelter.occupied_units} available</div>
              </h3>
              <h4>Contact {finalShelter.locationName}</h4>
            <h5>
              <span className="glyphicon glyphicon-phone-alt"></span>: {finalShelter.locationPhone}
            </h5>
              <div>
                <h5>Hours</h5>
                <div>Monday: {finalShelter.hoursMonday}</div>
                <div>Tuesday: {finalShelter.hoursTuesday}</div>
                <div>Wednesday: {finalShelter.hoursWednesday}</div>
                <div>Thursday: {finalShelter.hoursThursday}</div>
                <div>Friday: {finalShelter.hoursFriday}</div>
                <div>Saturday: {finalShelter.hoursSaturday}</div>
                <div>Sunday: {finalShelter.hoursSunday}</div>
              </div>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

ShelterProfile.propTypes = {
  params: React.PropTypes.object,
};

export default ShelterProfile;
