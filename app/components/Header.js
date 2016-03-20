import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import HeaderActions from '../actions/HeaderActions';
import HeaderStore from '../stores/HeaderStore';
import SignIn from './SignIn';
import SignedInNav from './SignedInNav';

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



    signIn(email,password){
      HeaderActions.postSignIn(email,password)
    }
// child components will render depending on success/fail of sign-in action
    render() {
      return (
        <div className ="col-sm-6 col-sm-offset-3">
          <span className="col-sm-3">
            <Link to="/">
              <img className="logo" src="/img/SHELTERED-logo.png" />
            </Link>
          </span>
          {this.state.signedIn ? <SignedInNav /> : <SignIn signIn={this.signIn}/>}
          <SignedInNav />
        </div>

      );
    }
}


export default Header;
