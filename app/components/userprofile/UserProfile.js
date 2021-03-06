import React from 'react';
import UserStore from '../../stores/UserStore';
import UserProfileActions from '../../actions/UserProfileActions';
import UserProfileView from './UserProfileView';
import UserProfileEdit from './UserProfileEdit';

class UserProfile extends React.Component {
  constructor() {
    super();
  // set initial state
    this.state = UserStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

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
    this.setState({
      clicked: click,
    });
  }

  handleUpdate(firstName, lastName, email, password, phone, passwordFlag, emailFlag) {
    // update state regardless of post success
    this.setState({
      userObjectProfile: {
        userFirstName: firstName,
        userLastName: lastName,
        userEmail: email,
        userPhone: phone,
        userPassword: password,
        userPasswordFlag: passwordFlag,
      },
    });
    
    UserProfileActions.updateUser(firstName,
                                  lastName,
                                  email,
                                  password,
                                  phone,
                                  passwordFlag,
                                  emailFlag);
  }


  render() {
    return (
      <div className ="well col-sm-6 col-sm-offset-3 text-center">
        <h2>User Profile</h2>
        {this.state.clicked ? <UserProfileEdit userInfo={this.state.userObjectProfile} save={this.handleUpdate} clicker={this.handleUserInput} clicked={this.state.clicked} /> : <UserProfileView userInfo={this.state.userObjectProfile} clicker={this.handleUserInput} clicked={this.state.clicked} />}
      </div>
    );
  }
}

export default UserProfile;
