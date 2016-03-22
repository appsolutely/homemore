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
		if(this.refs.email.value === '' || this.refs.password.value === ''){
			$("#err").removeClass('hidden');
		} else{
				const email = this.refs.email.value;
				const password = this.refs.password.value;
				this.props.signIn(
					email,
					password
				)
		}
	}

	render() {
	    return (
	    	<div>
	       <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
	          <ul className='header-signInNav nav navbar-nav'>
	            <li className="text-right"> <Link to="/signup">Sign up for an account</Link></li>
							<li id='err' className="hidden">Please Enter Email and Password</li>
	            <li>email: <input type='email' ref='email' onChange={this.update} placeholder="email address"/></li>
	            <li>password: <input type='password' ref='password' onChange={this.update} placeholder="password"/></li>
	            <span className='help'>{this.props.help}</span>
	            <li><Link to ="#" onClick={this.handleSignIn}><span className="glyphicon glyphicon-log-in"></span> Sign In</Link></li>

	          </ul>
	          </div>
	        </nav>
	      </div>
	    );
	}
}

export default SignIn;
