import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';


const { Input } = FRC;

const SignUpForm = React.createClass({

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


class AdminSignup extends React.Component {
  constructor() {
    super();
    this.state = { email: "", password: "", firstName: "", lastName: '', phone: '', orgName: ''}
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(data){
  let adminInfo = {adminUser: {firstName: this.refs.firstName.getValue(), lastName: this.refs.lastName.getValue(),
      password: this.refs.password.getValue(), email: this.refs.email.getValue(), phone: this.refs.phone.getValue()}, organizations:{ orgName: this.refs.orgName.getValue()}};
    console.log("User info submit", adminInfo)
    this.post(adminInfo);
  }

  post(data){
    console.log('data ', data);

    $.ajax({
      type: 'POST',
      url: '/api/signupAdmin',
      data: data,
      success: function(data){
        window.location.href = "./";
      },
      fail: function(err){
        console.log('err', err);
      }
    });
  }
  render(){
    return (
      <div className ="well col-sm-6 col-sm-offset-3">
        <SignUpForm 
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
            help="Email will serve as login"
            required
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
            name="password2"
            value=""
            label="Confirm password"
            type="password"
            validations="equalsField:password1"
            validationErrors={{
                equalsField: 'Passwords must match.'
            }}
            placeholder="Retype password"
          />
          <Input
            onUpdate={this.update}
            ref="firstName"
            name="firstName"
            value=""
            label="First Name"
            validations="isWords"
            type="text"
            placeholder="First Name"
            required
          />
          <Input
            onUpdate={this.update}
            ref="lastName"
            name="lastName"
            value=""
            label="Last Name"
            validations="isWords"
            type="text"
            placeholder="Last Name"
            required
          />
          <Input
            onUpdate={this.update}
            ref="phone"
            name="phone"
            value=""
            label="Phone Number"
            validations={{minLength: 10,
                          maxLength: 14}}
            validationError="Must be a valid phone number"
            type="text"
            placeholder="Phone Number"
          />
          <Input
            onUpdate={this.update}
            ref="orgName"
            name="orgName"
            value=""
            label="Organization Name"
            validations="isWords"
            type="text"
            placeholder="Organization Name"
            required
          />
        <button className="btn btn-primary" onValidSubmit={this.submitForm} type='submit'>Sign Up</button>

        </SignUpForm>
      </div>
  )
  }
}

export default AdminSignup
