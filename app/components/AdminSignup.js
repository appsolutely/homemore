import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';


const {Input} = FRC;

const SignUpForm = React.createClass({

    mixins: [FRC.ParentContextMixin],

    render() {
        return (
            <Formsy.Form
                className={this.getLayoutClassName()}
                {...this.props}
                ref="formsy"
            >
                {this.props.children}
            </Formsy.Form>
        );
    }

});


class AdminSignup extends React.Component {
  constructor(){
    super();
    this.state = {email: "", password: "", firstName: "", lastName: '', phone: '', orgName: ''}
    this.update = this.update.bind(this);
    console.log('The state ', this.state)
  }
  update(e){
    this.setState({
      email: ReactDOM.findDOMNode(this.refs.email.refs.inp).value,
      password: ReactDOM.findDOMNode(this.refs.password.refs.inp).value,
      firstName: ReactDOM.findDOMNode(this.refs.firstName.refs.inp).value,
      lastName: ReactDOM.findDOMNode(this.refs.lastName.refs.inp).value,
      phone: ReactDOM.findDOMNode(this.refs.phone.refs.inp).value,
      orgName: ReactDOM.findDOMNode(this.refs.orgName.refs.inp).value
    })
  }
  submitForm(e){
    e.preventDefault();
  let adminInfo = {adminUser: {firstName: this.state.firstName, lastName: this.state.lastName,
      password: this.state.password, email: this.state.email, phone: this.state.phone}, organizations:{ orgName: this.state.orgName}};
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
        <SignUpForm className="text-left">
          <Input
            ref="email"
            update={this.update}
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
            update={this.update}
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
            update={this.update}
            ref="firstName"
            name="firstName"
            value=""
            label="First Name"
            type="text"
            placeholder="First Name"
            required
          />
          <Input
            update={this.update}
            ref="lastName"
            name="lastName"
            value=""
            label="Last Name"
            type="text"
            placeholder="Last Name"
            required
          />
          <Input
            update={this.update}
            ref="phone"
            name="phone"
            value=""
            label="Phone Number"
            type="text"
            placeholder="Phone Number"
          />
          <Input
            update={this.update}
            ref="orgName"
            name="orgName"
            value=""
            label="Organization Name"
            type="text"
            placeholder="Organization Name"
            required
          />
        <button className="btn btn-primary" type='submit' onClick={this.submitForm.bind(this)}>Sign Up</button>

        </SignUpForm>
      </div>
  )
  }
}

export default AdminSignup
