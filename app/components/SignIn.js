import React from 'react';
import { Link } from 'react-router';


class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.handleSignIn = this.handleSignIn.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	//will pass email and password back up to parent for processing
	//no need to bring state into this, aside from 
	handleSignIn(e) {
		e.preventDefault();
		var email = this.refs.email.value;
		var password = this.refs.password.value;
		this.props.signIn(
			email,
			password
		)
	}
	//this is wrong - child should not have access to state- fix later
	//should log out even be in the signin component?
	handleLogOut(e) {
		e.preventDefault();
		this.state.signedin = false;
	}

	render() {
	    return (
	      <div className ="col-sm-6 col-sm-offset-3">
	        <div className="row">
	          <span className="loginFields text-right">
	            <div>email: <input type='email' ref='email' onChange={this.update} placeholder="email address"/></div>
	            <div>password: <input type='password' ref='password' onChange={this.update} placeholder="password"/></div>
	            <div>
	              <button className="btn btn-primary" type='button' onClick={this.handleSignIn}>Sign In</button>
	              <Link className="btn btn-primary" to="/signup">Sign up</Link>
	            </div>
	          </span>
	          <div className="welcome text-right">
	            <Link to="/user-profile"> My Account </Link>
	            <button className="btn btn-primary" type='button' >Log Out</button>
	          </div>
	        </div>
	      </div>
	    );	
	}
}

export default SignIn;
