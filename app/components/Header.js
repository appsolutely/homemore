import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(){
    super()
      this.state = {email: "", password: ""}
      this.update = this.update.bind(this);
    }
    componentDidMount() {
       if(!document.cookie){
         $( ".loginFields" ).show();
         if(window.location.pathname != '/'){
           window.location.href = "./";
         }
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
        email: ReactDOM.findDOMNode(this.refs.email).value,
        password: ReactDOM.findDOMNode(this.refs.password).value,
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
      window.location.href = "../";
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
      <div className ="col-sm-6 col-sm-offset-3">
        <span className="col-sm-3">
          <Link to="/">
            <img className="logo" src="/img/SHELTERED-logo.png" />
          </Link>
        </span>
        <div className="row">
          <span className="loginFields text-right">
            <div>email: <input ref = 'email' onChange={this.update} type = "text" placeholder="Username"/></div>
            <div>password: <input ref = 'password' onChange={this.update} type="password" placeholder = "password"/></div>
            <div>
              <button className="btn btn-primary" type='button' onClick={this.submitLogin.bind(this)}>Sign In</button>
              <Link className="btn btn-primary" to="/signup">Sign up</Link>
            </div>
          </span>
          <div className="welcome text-right">
            <Link to="/user-profile"> My Account </Link>
            <button className="btn btn-primary" type='button' onClick={this.logOut.bind(this)}>Log Out</button>
          </div>
        </div>

      </div>

    );
    }
}


export default Header;
