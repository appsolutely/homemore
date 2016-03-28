import React from 'react';
// import { Link } from 'react-router';
// import alt from '../alt';

class UserProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

// define handler that will pass back to parent component
  handleClick() {
    this.props.clicker(
      this.props.clicked ? false : true
    );
  }

  render() {
    return (
      <div className="text-left">
          <div className="profileFieldName text-capitalize">
            <label>First Name: </label> {this.props.userInfo.userFirstName}
            <br />
            <label>Last Name:</label> {this.props.userInfo.userLastName}
          </div>
          <div className="profileFieldEmail">
            <label>Email:</label> {this.props.userInfo.userEmail}
          </div>
          <div className="profileFieldPassword">
            <label>Password:</label> ******
          </div>
          <div className="profileFieldPhone">
            <label>Phone:</label> {this.props.userInfo.userPhone}
          </div>

          <button className="btn btn-primary editButton" onClick={this.handleClick}>Edit Me</button>
      </div>
    );
  }
}

UserProfileView.propTypes = {
  clicker: React.PropTypes.func,
  clicked: React.PropTypes.bool,
  userInfo: React.PropTypes.string,
};

export default UserProfileView;