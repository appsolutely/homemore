import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';


class ShelterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = alt.stores.ShelterStore.state;
  }

  render() {
    const theShelter = this.state.shelters.filter((shelter) => {
      return shelter.shelterName === this.props.params.id;
    })[0];
     // console.log('var should be ', theShelter)
    return (
       <div className ="jumbotron col-sm-6 col-sm-offset-3 text-center">
         <div className="shelterProfile">
          <h3>{theShelter.shelterName}</h3>
          <h3>{theShelter.shelterDaytimePhone}</h3>
          <h3>Hours</h3>
          <table>
            <tbody>
              <tr>
                <th>Monday</th>
                <td>{theShelter.hoursMonday}</td>
              </tr>
              <tr>
                <th>Tuesday</th>
                <td>{theShelter.hoursTuesday}</td>
              </tr>
              <tr>
                <th>Wednesday</th>
                <td>{theShelter.hoursWednesday}</td>
              </tr>
              <tr>
                <th>Thursday</th>
                <td>{theShelter.hoursThursday}</td>
              </tr>
              <tr>
                <th>Friday</th>
                <td>{theShelter.hoursFriday}</td>
              </tr>
              <tr>
                <th>Saturday</th>
                <td>{theShelter.hoursSaturday}</td>
              </tr>
              <tr>
                <th>Sunday</th>
                <td>{theShelter.hoursSunday}</td>
              </tr>
            </tbody>
          </table>
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

