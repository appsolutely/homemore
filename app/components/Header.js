import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (<div><SignInFields /></div>);
  }
}

class SignInFields extends React.Component {
  constructor(){
    super()
      this.state = {email: "", password: ""}
      this.update = this.update.bind(this);
    }
    componentDidMount() {
      if(!document.cookie){
        console.log("this is COOKIE!",document.cookie)
        $( ".loginFields" ).show();
      }
      else{
        $( ".loginFields" ).hide();
        $( ".welcome" ).show();
      }
    }

    test(){
      console.log('pew pew pew')
    }
    update(e){
      this.setState({
        email: ReactDOM.findDOMNode(this.refs.email.refs.inp).value,
        password: ReactDOM.findDOMNode(this.refs.password.refs.inp).value,
      })
    }
    submitLogin(e){
      e.preventDefault();
      let signInInfo = {user: {password: this.state.password, email: this.state.email}}
      this.signIn(signInInfo)

    }

    logOut(){
      document.cookie = "sessionId" + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      $( ".loginFields" ).show();
      $( ".welcome" ).hide();
  }

    signIn(creds){
      $.ajax({
        type: 'POST',
        url: '/api/signin',
        data: creds,
        success: function(data){
        $( ".loginFields" ).hide();
        $( ".welcome" ).show();
        },
        fail: function(err){
          console.log('err', err);
        }
    })
    }

    render() {
    return (
      <div className ="well col-sm-6 col-sm-offset-3 text-left">
      <Link to="/">
        <img className="logo" src="/img/SHELTERED-logo.png" />
      <br/><br/><br/>
      </Link>

          <div className="loginFields">
            <div className="col-sm-3">email: <SignInInfo ref = 'email' update={this.update} placeholder="Username"/></div>
            <div className="col-sm-3">password: <SignInInfo ref = 'password' update={this.update} placeholder="Username"/></div>
            <br/>

            <div className="col-sm-3"><button type='button' onClick={this.submitLogin.bind(this)}>Sign In</button></div>
          <div className="col-sm-3"><Link to="/signup">sign up</Link></div>

          </div>
          <div className="welcome">
            <Link to="/user-profile">
              My Account
            </Link>
            <div className="col-sm-3"><button type='button' onClick={this.logOut.bind(this)}>Log Out</button></div>
          </div>
      </div>

    );
    }
}

class SignInInfo extends React.Component  {
  render(){
    return(
      <div>
        <input ref="inp" type = "text"
          onChange={this.props.update} />
      </div>)
  }
}

export default Header;
