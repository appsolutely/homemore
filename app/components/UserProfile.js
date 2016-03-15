import React from 'react';
import { Link } from 'react-router';
import UserStore from '../stores/UserStore';
import UserProfileActions from '../actions/UserProfileActions';
import UserProfileView from '../components/UserProfileView';
import UserProfileEdit from '../components/UserProfileEdit';

class UserProfile extends React.Component {
  constructor() {
    super();
  // set initial state
    this.state = UserStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this.onChange);
    UserProfileActions.getUser();
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick() {
    this.setState({
      clicked: this.state.clicked ? false : true,
    })
    console.log(this.state.clicked)
  }

  render() {
    return (
      <div className ="col-sm-6 col-sm-offset-3 text-center">User Profile
        <h2>User Profile</h2>
          <UserProfileView user={this.state.userObject} />
        <button className="editButton" onClick={this.handleClick}>Edit Me</button>
      </div>
    );
  }
}

export default UserProfile;



