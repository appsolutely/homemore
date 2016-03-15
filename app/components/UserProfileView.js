import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class UserProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.state = alt.stores.UserStore.state;
	}

  render() {
    return (
      <div>
        <div className='profileFieldName'>
          <h3>First Name:</h3>
          <p>{this.props.userFirstName}</p>
          <h3>Last Name:</h3>
          <p>{this.props.userLastName}</p>
        </div>
        <div className='profileFieldEmail'>
          <h3>Email:</h3>
          <p>{this.props.userEmail}</p>
        </div>
        <div className="profileFieldPhone">
          <h3>Phone:</h3>
          <p>{this.props.userPhone}</p>
        </div>
      </div>
    );
  }
}

export default UserProfileView;