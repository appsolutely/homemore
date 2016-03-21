import React from 'react';
import { Link } from 'react-router';


class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.handleSignIn = this.handleSignIn.bind(this);
	}

	//will pass email and password back up to parent for processing
	//no need to bring state into this, aside from 
	handleSignIn(e) {
		e.preventDefault();
		const email = this.refs.email.value;
		const password = this.refs.password.value;
		this.props.signIn(
			email,
			password
		)
	}

	render() {
	    return (
	      <div className ="col-sm-6 col-sm-offset-3">
	        <div className="row">
	          <span className="loginFields text-right">
	            <div className="text-right"> <Link to="/signup">Sign up for an account</Link></div>
	            <div>email: <input type='email' ref='email' onChange={this.update} placeholder="email address"/></div>
	            <div>password: <input type='password' ref='password' onChange={this.update} placeholder="password"/></div>
	            <div>
	              <button className="btn btn-primary" type='button' onClick={this.handleSignIn}>Sign In</button>
	              <br/>
	            </div>
	          </span>
	        </div>
	      </div>
	    );	
	}
}

export default SignIn;
