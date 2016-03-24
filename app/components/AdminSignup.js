import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';

class AdminSignup extends React.Component {
  constructor(){
    super();
    this.state = {email: "", password: "", firstName: "", lastName: '', phone: '', orgName: '', 
    passwordValidationState: '', emailValidationState: '', nameValidationState: '', phoneValidationState: ''}
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
        <form className="text-left">
          <label>Email</label>
          <EmailInfo ref = 'email' update={this.update} validation={this.state}/>
          <label>Password</label>
          <PasswordInfo ref = 'password' update={this.update} validation={this.state}/>
          <label>First Name</label>
          <AccountInfo ref = 'firstName' update={this.update} validation={this.state}/>
          <label>Last Name</label>
          <AccountInfo ref = 'lastName' update={this.update} validation={this.state}/>
          <label>Phone Number</label>
          <PhoneInfo ref = 'phone' update={this.update} validation={this.state}/>
          <label>Org Name</label>
          <AccountInfo ref = 'orgName' update={this.update} validation={this.state}/>
       
        <button className="btn btn-primary" type='submit' onClick={this.submitForm.bind(this)}>Sign Up</button>

        </form>
      </div>
  )
  }
}

class PasswordInfo extends React.Component {
  render(){
    return(
      <div className={'form-group ' + this.props.validation.passwordValidationState}>
        <input className='form-control' minLength="7" ref="inp" type = "password" required="required"
          onChange={this.props.update} />
      </div>)
  }
}

class AccountInfo extends React.Component  {
  render(){
    return(
      <div className={'form-group ' + this.props.validation.nameValidationState}>
        <input className='form-control' ref="inp" type = "text" required="required"
          onChange={this.props.update} />
      </div>)
  }
}

class EmailInfo extends React.Component {
  render() {
    return (
      <div className={'form-group ' + this.props.validation.emailValidationState}>
          <input className='form-control' ref="inp" type="email" required="required"
            onChange={this.props.update} />
      </div>)
  }
}

class PhoneInfo extends React.Component {
  render() {
    return(
      <div className={'form-group ' + this.props.validation.phoneValidationState}>
        <input minLength="10" className='form-control' ref="inp" type = "phone" required="required"
          onChange={this.props.update} />
      </div>)
  }
}


export default AdminSignup
