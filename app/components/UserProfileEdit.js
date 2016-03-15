import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class UserProfileEdit extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (
      <div className ="col-sm-6 col-sm-offset-3 text-center">User Profile
        <h2>User Profile</h2>
        <div className='profileFieldName'>
          <h3>First Name:</h3>
          <p>{this.state.userObject.userFirstName}</p>
          <h3>Last Name:</h3>
          <p>{this.state.userObject.userLastName}</p>
        </div>
        <div className='profileFieldEmail'>
          <h3>Email:</h3>
          <p>{this.state.userObject.userEmail}</p>
        </div>
        <div className="profileFieldPhone">
          <h3>Phone:</h3>
          <p>{this.state.userObject.userPhone}</p>
        </div>
        <div className="editButton" onClick={this.handleClick}>Edit me</div>
      </div>
    );
  }
}

export default UserProfileEdit;