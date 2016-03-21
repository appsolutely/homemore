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
  			<Link to={'/occupy/' + shelter.shelterName}>
		  		<div key={shelter.shelterID} className="well shelterCard">
            <div className="shelterInfo">
		              <div className="text-left">
		                  <div className="org text-capitalize"><p><b>{shelter.organizationName}</b></p>
                      <div className="shelterName">{shelter.shelterName}</div>

                      <p>{shelter.shelterDaytimePhone}</p>
                      <p>{shelter.shelterEmergencyPhone}</p>
                      <p>{shelter.shelterEmail}</p>
                      <div className="locationName">{shelter.locationName}</div>
<h5 className="text-lowercase"> operated by 
                    <span className="orgName text-capitalize">
                      <em> {shelter.organizationName}</em>
                    </span> @ the 
                    <span className="locationName text-capitalize"> {shelter.locationName}
                    </span>
                  </h5>

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
      		<p>Hello {this.state.managerObjectProfile.userFirstName} !</p>
      		<p>You currently manage the following shelter(s):</p>
      	<div>
      		{managedShelters}
      	</div>
      </div>
    );
  }
}

export default ManagerProfile;
