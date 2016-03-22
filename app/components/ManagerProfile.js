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
  			<Link to={'/manage-shelters/' + shelter.shelterID}>
		  		<div key={shelter.shelterID} className="well shelterCard">
            <div className="shelterInfo text-left">
            <h3>Shelter Information</h3>
                <div className="org text-capitalize">
                  <span className="orgName">Organization: {shelter.organizationName ? shelter.organizationName : "Unknown Organization "}</span>
                  <span className="locationName text-capitalize"> {shelter.locationName}</span>
                  <div><span className="shelterName">Shelter Name: {shelter.shelterName ? shelter.shelterName : "unknown"}</span> </div>
                  <div><span>Daytime Phone: {shelter.shelterDaytimePhone ? shelter.shelterDaytimePhone : "unknown"}</span> </div>
                  <div>
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
