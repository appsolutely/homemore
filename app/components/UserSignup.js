import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';

class UserSignup extends React.Component {
  constructor() {
    super();
    this.state = {email: "adsf", password: "adf", firstName: "adsf", lastName: 'adsf', phone: 'adsf'}
    this.update = this.update.bind(this);
    //this.submitForm = this.submitForm(this.state);
  }
  post(data) {
    console.log('data ', data);

    $.ajax({
      type: 'POST',
      url: '/api/signup',
      data: data,
      success: function(data) {
        window.location.href = "./";
      },
      fail: function(err) {
        console.log('err', err);
      }
    });
  }
  update(e) {
    this.setState({
      email: ReactDOM.findDOMNode(this.refs.email.refs.inp).value,
      password: ReactDOM.findDOMNode(this.refs.password.refs.inp).value,
      firstName: ReactDOM.findDOMNode(this.refs.firstName.refs.inp).value,
      lastName: ReactDOM.findDOMNode(this.refs.lastName.refs.inp).value,
      phone: ReactDOM.findDOMNode(this.refs.phone.refs.inp).value,
    });
  }
  submitForm(e){
    e.preventDefault();
  let userInfo = {pubUser: {firstName: this.state.firstName, lastName: this.state.lastName,
      password: this.state.password, email: this.state.email, phone: this.state.phone}};
    console.log("User info submit", userInfo)
    this.post(userInfo);
  }
  render(){
    return (
      <div className ="col-sm-6 col-sm-offset-3 text-center">
        <form>

        <p>First Name</p>
        <AccountInfo ref = 'firstName' update={this.update} />

        <p>Last Name</p>
        <AccountInfo ref = 'lastName' update={this.update} />
        <p>Email</p>
        <AccountInfo ref = 'email' update={this.update} />

        <p>Password</p>
        <AccountInfo ref = 'password' update={this.update} />

        <p>Phone Number</p>
        <AccountInfo ref = 'phone' update={this.update} />

        <br/>
        <button type='submit' onClick={this.submitForm.bind(this)}>click me</button>

        </form>
      </div>
  )
  }
}

class AccountInfo extends React.Component  {
  render(){
    return(
      <div>
        <input ref="inp" type = "text"
          onChange={this.props.update} />
      </div>)
  }
}


export default UserSignup
