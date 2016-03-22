import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';

class AdminSignup extends React.Component {
  constructor(){
    super();
    this.state = {email: "", password: "", firstName: "", lastName: '', phone: '', orgName: ''}
    this.update = this.update.bind(this);
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
        <div>
          <label>Email</label>
          <EmailInfo ref = 'email' update={this.update} />
        </div>
        <div>
          <label>Password</label>
          <PasswordInfo ref = 'password' update={this.update} />
        </div>
        <div>
          <label>First Name</label>
          <AccountInfo ref = 'firstName' update={this.update} />
        </div>
        <div>
          <label>Last Name</label>
          <AccountInfo ref = 'lastName' update={this.update} />
        </div>
        <div>
          <label>Phone Number</label>
          <PhoneInfo ref = 'phone' update={this.update} />
        </div>
        <div>
          <label>Org Name</label>
          <AccountInfo ref = 'orgName' update={this.update} />
        </div>
       
        <button className="btn btn-primary" type='submit' onClick={this.submitForm.bind(this)}>Sign Up</button>

        </form>
      </div>
  )
  }
}
class PasswordInfo extends React.Component {
  render(){
    return(
      <div>
        <input minlength="7" ref="inp" type = "password" required="required"
          onChange={this.props.update} />
      </div>)
  }
}

class AccountInfo extends React.Component  {
  render(){
    return(
      <div>
        <input ref="inp" type = "text" required="required"
          pattern="([A-ZΆ-ΫÀ-ÖØ-Þ][A-ZΆ-ΫÀ-ÖØ-Þa-zά-ώß-öø-ÿ]{1,19} ?){1,10}"
          onChange={this.props.update} />
      </div>)
  }
}

class EmailInfo extends React.Component {
  render() {
    return (
      <div>
          <input ref="inp" type="email" required="required"
            pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
            onChange={this.props.update} />
      </div>)
  }
}

class PhoneInfo extends React.Component {
  render() {
    return(
      <div>
        <input ref="inp" type = "phone" required="required"
          onChange={this.props.update} />
      </div>)
  }
}


export default AdminSignup
