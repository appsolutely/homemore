import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class UserProfileView extends React.Component {
	constructor(props) {
		super(props);
    console.log('inside of profile view',this.props.user.userFirstName)
    this.handleClick = this.handleClick.bind(this);
	}

  //define handler that will pass back to parent component 
  handleClick() {
    this.props.clicker(
      this.props.clicked ? false : true
    )
  }

  render() {
    return (
      <div>
        <div className='profileFieldName'>
          <h3>First Name:</h3>
            <p>{this.props.user.userFirstName}</p>
          <h3>Last Name:</h3>
            <p>{this.props.user.userLastName}</p>
        </div>
        <div className='profileFieldEmail'>
          <h3>Email:</h3>
            <p>{this.props.user.userEmail}</p>
        </div>
        <div className="profileFieldPhone">
          <h3>Phone:</h3>
            <p>{this.props.user.userPhone}</p>
        </div>
        <button className="editButton" onClick={this.handleClick}>Edit Me</button>
      </div>
    );
  }
}

export default UserProfileView;