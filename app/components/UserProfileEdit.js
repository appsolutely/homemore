import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class UserProfileEdit extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (
      <div>
        <div className='profileFieldName'>
          <h3>Edit First Name:</h3>
          <p>{this.props.userFirstName}</p>
          <h3>Edit Last Name:</h3>
          <p>{this.props.userLastName}</p>
        </div>
        <div className='profileFieldEmail'>
          <h3>Edit Email:</h3>
          <p>{this.props.userEmail}</p>
        </div>
        <div className="profileFieldPhone">
          <h3>Edit Phone:</h3>
          <p>{this.props.userPhone}</p>
        </div>
      </div>
    );
  }
}

export default UserProfileEdit;