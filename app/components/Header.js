import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import HeaderActions from '../actions/HeaderActions';
import HeaderStore from '../stores/HeaderStore';
import SignIn from './SignIn';

class Header extends React.Component {
  constructor(props){
    super(props)
      this.state = {email: "", password: ""}
      this.update = this.update.bind(this);
      this.signIn = this.signIn.bind(this);
    }
    componentDidMount() {
       if(!document.cookie){
         $( ".loginFields" ).show();
         //auto redirect if no session cookie
         if(window.location.pathname != '/'){
           window.location.href = "./";
         }
       }
       else{
         $( ".loginFields" ).hide();
         $( ".welcome" ).show();
       }
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

    signIn(email,password){
      HeaderActions.postSignIn(email,password)
    }

    render() {
      return (
        <div className ="col-sm-6 col-sm-offset-3">
          <span className="col-sm-3">
            <Link to="/">
              <img className="logo" src="/img/SHELTERED-logo.png" />
            </Link>
          </span>
          <SignIn signIn={this.signIn}/>
        </div>

      );
    }
}


export default Header;
