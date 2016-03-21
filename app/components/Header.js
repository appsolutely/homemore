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
      this.state = HeaderStore.getState();
      this.onChange = this.onChange.bind(this);
      this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
       if(document.cookie){
         this.setState({signedIn: true})
         //auto redirect if no session cookie
       }
       if(!document.cookie){
       if(window.location.pathname != '/'){
         window.location.href = "./";
       }}
       HeaderStore.listen(this.onChange);
    }

    submitLogin(e){
      e.preventDefault();
      let signInInfo = {user: {password: this.state.password, email: this.state.email}}
      this.signIn(signInInfo)
    }

    onChange(state) {
      this.setState(state);
    }


    signIn(email,password){
      HeaderActions.postSignIn(email,password)
    }
// child components will render depending on success/fail of sign-in action
    render() {
      return (
        <div className ="col-sm-6 col-sm-offset-3">
          <div className="header">
            <Link to="/">
              <img className="logo" src="/img/SHELTERED-logo.png" />
            </Link>
            {this.state.signedIn ? <SignedInNav /> : <SignIn signIn={this.signIn} help={this.state.help}/>}
          </div>
        </div>

      );
    }
}


export default Header;
