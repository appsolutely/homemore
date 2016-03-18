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
  	console.log(this.state.managerObjectShelters)
  	const managedShelters = this.state.managerObjectShelters.map((shelter) => {
  		return(
	  		<div key={shelter.organizationName} className="well shelterCard">
	              <div className="text-left shelterInfo">
	                  <div className="org text-capitalize"><p><b>{shelter.organizationName}</b></p></div>
	              </div>
	  		</div>
	  	)
  	})
    return (
      <div className ="col-sm-6 col-sm-offset-3 text-center">
      	<h2>Manager Profile</h2>
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
