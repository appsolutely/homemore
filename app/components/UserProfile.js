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
    console.log(this.state.jeff)
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
      <div className ="col-sm-6 col-sm-offset-3 text-center">User Profile</div>
    );
  }
}

export default UserProfile;
