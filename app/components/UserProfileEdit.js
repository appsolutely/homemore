import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

const {Input} = FRC;

const UpdateUserForm = React.createClass({
    mixins: [FRC.ParentContextMixin],
    render() {
        return (
            <Formsy.Form
                {...this.props}
                ref="formsy"
            >
                {this.props.children}
            </Formsy.Form>
        );
    }
});

class UserProfileEdit extends React.Component {
	constructor(props) {
		super(props);
    this.handleClick = this.handleClick.bind(this);
	}

  handleClick(e) {
    e.preventDefault();
    var first = this.refs.firstName.getValue() || this.props.userInfo.userFirstName;
    var last = this.refs.lastName.getValue() || this.props.userInfo.userLastName;
    var email = this.refs.email.getValue() || this.props.userInfo.userEmail;
    var password = this.refs.password.getValue();
    var phone = this.refs.phone.getValue() || this.props.userInfo.userPhone;
    var flag = this.refs.password.getValue().length === 0 ? false : true;
    this.props.save(
      first,
      last,
      email,
      password,
      phone,
      flag
    )
    this.props.clicker(
      this.props.clicked ? false : true
    )
  }

  render() {
    return (
      <UpdateUserForm
        onValidSubmit={this.submitForm}
        className="text-left">
          <Input
            ref="email"
            onUpdate={this.update}
            name="email"
            value=""
            label="Email"
            type="email"
            placeholder="Email"
            validations="isEmail"
            validationErrors={{
                isEmail: 'This doesn’t look like a valid email address.'
            }}
          />
          <Input
            onUpdate={this.update}
            ref="password"
            name="password1"
            value=""
            label="Password"
            type="password"
            validations="minLength:8"
            validationError="Your password must be at least 8 characters long."
            placeholder="Choose a password"
          />
          <Input
            onUpdate={this.update}
            ref="firstName"
            name="firstName"
            value=""
            label="First Name"
            type="text"
            placeholder="First Name"
          />
          <Input
            onUpdate={this.update}
            ref="lastName"
            name="lastName"
            value=""
            label="Last Name"
            type="text"
            placeholder="Last Name"
          />
          <Input
            onUpdate={this.update}
            ref="phone"
            name="phone"
            value=""
            label="Phone Number"
            validations={{isLength: 10,
                          isNumeric: true}}
            validationError="Must be a valid phone number"
            type="text"
            placeholder="Phone Number"
          />
        <button className="btn btn-primary editButton" onClick={this.handleClick} >Save Changes</button>
      </UpdateUserForm>
    );
  }
}

export default UserProfileEdit;
