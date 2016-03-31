import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

const { Input } = FRC;

// no mixins with es6 - hence the es5 here
const UpdateUserForm = React.createClass({
  mixins: [FRC.ParentContextMixin],
  render() {
    return (
      <Formsy.Form
        {...this.props}
        ref="formsy"
      >
      { this.props.children }
      </Formsy.Form>
    );
  },
});

class UserProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

// submit revised profile
  handleEdit(e) {
    e.preventDefault();
    const first = this.refs.firstName.getValue() || this.props.userInfo.userFirstName;
    const last = this.refs.lastName.getValue() || this.props.userInfo.userLastName;
    const email = this.refs.email.getValue() || this.props.userInfo.userEmail;
    const password = this.refs.password.getValue();
    const phone = this.refs.phone.getValue() || this.props.userInfo.userPhone;
    const flag = this.refs.password.getValue().length === 0 ? false : true;
    this.props.save(
      first,
      last,
      email,
      password,
      phone,
      flag
    );
    this.props.clicker(
      this.props.clicked ? false : true
    );
  }

  render() {
    return (
      <UpdateUserForm
        onValidSubmit={this.submitForm}
        className="text-left"
      >
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
            validations= { { isLength: 10,
                          isNumeric: true } }
            validationError="Must be a valid phone number"
            type="text"
            placeholder="Phone Number"
          />
        <button className="btn btn-primary editButton" onClick={this.handleEdit} >
          Save Changes
        </button>
      </UpdateUserForm>
    );
  }
}

UserProfileEdit.propTypes = {
  userFirstName: React.PropTypes.string,
  userLastName: React.PropTypes.string,
  userEmail: React.PropTypes.string,
  userInfo: React.PropTypes.string,
  save: React.PropTypes.func,
  clicker: React.PropTypes.func,
  clicked: React.PropTypes.bool,
};

export default UserProfileEdit;
