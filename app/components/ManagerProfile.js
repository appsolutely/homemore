import React from 'react';
import { Link } from 'react-router';
import ManagerActions from '../actions/ManagerActions';
import ManagerStore from '../stores/ManagerStore';

class ManagerProfile extends React.Component {
  constructor(props){
  	super(props);
  	this.state = ManagerStore.getState();
  	this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
  	ManagerStore.listen(this.onChange);
  	//catch-all for loading
  	//all required fields into state
  	ManagerActions.getManagerProfile();
  }

  componentWillUnmount(){
  	ManagerStore.unlisten(this.onChange)
  }

  onChange(state) {
  	this.setState(state);
  }

  render() {

  	const managedShelters = this.state.managerObjectShelters.map((shelter) => {
  		return(
  			<Link to={'/manager-profile/' + shelter.shelterID}>
		  		<div key={shelter.shelterID} className="well shelterCard">
            <div className="shelterInfo text-left">
            <h3>Shelter Information</h3>
                <div className="org text-capitalize">
                  <span className="orgName">Organization: {shelter.organizationName ? shelter.organizationName : "Unknown Organization "}</span>
                  <div><span className="shelterName">Shelter Name: {shelter.shelterName ? shelter.shelterName : "unknown"}</span> </div>
                  <div><span>Daytime Phone: {shelter.shelterDaytimePhone ? shelter.shelterDaytimePhone : "unknown"}</span> </div>
                  <div><span>Emergency Phone: {shelter.shelterEmergencyPhone ? shelter.shelterEmergencyPhone : "unknown"}</span> </div>
                  <div><span>Email: {shelter.shelterEmail ? shelter.shelterEmail : "unknown"}</span></div>
                  <div><h4>Location Information</h4>
                    <div><span>Location Name: {shelter.locationName ? shelter.locationName : "unknown"}</span> </div>
                    <div><span>Street Address: {shelter.locationStreet ? shelter.locationStreet : "unknown"}</span></div>
                    <div><span>City: {shelter.locationCity ? shelter.locationCity : "unknown"}</span></div>
                    <div><span>State: {shelter.locationState ? shelter.locationState : "unknown"}</span></div>
                    <div><span>Zip: {shelter.locationZip ? shelter.locationZip : "unknown"}</span></div>
                  </div>
                  <div>
                    <h4>Hours of Operation</h4>
                      <div>Monday: {shelter.hoursMonday ? shelter.hoursMonday : "unlisted"}</div>
                      <div>Tuesday: {shelter.hoursTuesday ? shelter.hoursTuesday : "unlisted"}</div>
                      <div>Wednesday: {shelter.hoursWednesday ? shelter.hoursWednesday : "unlisted"}</div>
                      <div>Thursday: {shelter.hoursThursday ? shelter.hoursThursday : "unlisted"}</div>
                      <div>Friday: {shelter.hoursFriday ? shelter.hoursFriday : "unlisted"}</div>
                      <div>Saturday: {shelter.hoursSaturday ? shelter.hoursSaturday : "unlisted"}</div>
                      <div>Sunday: {shelter.hoursSunday ? shelter.hoursSunday : "unlisted"}</div>
                  </div>
                  <div>
                    <span className="locationName text-capitalize"> {shelter.locationName}</span>
                  </div>
                </div>
		  		  </div>
          </div>
		  	</Link>
	  	)
  	})
    return (
      <div className ="well col-sm-6 col-sm-offset-3 text-left">
      	<h2>Manage Shelters</h2>
      		<p>Hi </p>
      		<p>You currently manage the following shelter(s):</p>
      	<div>
      		{managedShelters}
      	</div>
      </div>
    );
  }
}

export default ManagerProfile;
