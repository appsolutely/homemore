import React from 'react';
import { Link } from 'react-router';
import UserStore from '../stores/UserStore';
import UserProfileActions from '../actions/UserProfileActions';

class UserProfile extends React.Component {
  constructor() {
    super();
  // set initial state
    this.state = UserStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this.onChange);
    UserProfileActions.getUser();
  }

  onChange(state) {
    this.setState(state);
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
      </div>
    );
  }
}

export default UserProfile;
