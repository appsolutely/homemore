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
    this.handleUserInput= this.handleUserInput.bind(this);
  }
// will need to add in handleUserINput to accomodate edits from the main page
  componentDidMount() {
    UserStore.listen(this.onChange);
    UserProfileActions.getUser();
  }

  onChange(state) {
    this.setState(state);
  }

  handleUserInput(click) {
    this.setState({
      // clicked: this.state.clicked ? false : true,
      clicked: click,
    })
    console.log(this.state.userObject)
  }

  render() {
    return (
      <div className ="col-sm-6 col-sm-offset-3 text-center">
        <h2>User Profile</h2>
          {this.state.clicked ? <UserProfileEdit user={this.state.userObject} /> : <UserProfileView user={this.state.userObject} clicker={this.handleUserInput} clicked={this.state.clicked} />}
      </div>
    );
  }
}

export default UserProfile;



