import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class UserProfileEdit extends React.Component {
	constructor(props) {
		super(props);
    console.log('inside of UserProfileEdit', props)
	}

  render() {
    return (
      <form>
        <div className='profileFieldName'>
          <h3>Edit First Name:</h3>
          <p>{this.props.user.userFirstName}</p>
          <h3>Edit Last Name:</h3>
          <p>{this.props.user.userLastName}</p>
        </div>
        <div className='profileFieldEmail'>
          <h3>Edit Email:</h3>
          <p>{this.props.user.userEmail}</p>
        </div>
        <div className="profileFieldPhone">
          <h3>Edit Phone:</h3>
          <p>{this.props.user.userPhone}</p>
        </div>
        <button className="editButton" onClick={this.handleClick}>Save Changes</button>
      </form>
    );
  }
}

export default UserProfileEdit;