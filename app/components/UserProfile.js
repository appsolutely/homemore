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
    this.handleUpdate = this.handleUpdate.bind(this);
    this.obj = this.state.userObject.user
  }
// will need to add in handleUserINput to accomodate edits from the main page
  componentDidMount() {
    UserStore.listen(this.onChange);
    UserProfileActions.getUser();
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleUserInput(click) {
    console.log('making it back to the clicker', click)
    this.setState({
      // clicked: this.state.clicked ? false : true,
      clicked: click,
    })
    console.log(this.state.userObject)
  }

  handleUpdate(firstName, lastName, email, password, phone, passwordFlag) {
    this.setState({
      userObjectProfile: {
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,
      userPhone: phone,
      userPassword: password,
      userPasswordFlag: passwordFlag,
      }
    });
    // console.log('made it back to handleUpdate', this.state.userObject)
  }


  render() {
    return (
      <div className ="col-sm-6 col-sm-offset-3 text-center">
        <h2>User Profile</h2>
        {this.state.clicked ? <UserProfileEdit userInfo={this.state.userObjectProfile} save={this.handleUpdate} clicker={this.handleUserInput} clicked={this.state.clicked} /> : <UserProfileView userInfo={this.state.userObjectProfile} clicker={this.handleUserInput} clicked={this.state.clicked} />}
      </div>
    );
  }
}

export default UserProfile;



