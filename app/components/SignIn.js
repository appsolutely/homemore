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
	    	<nav className="navbar navbar-default navbar-fixed-top">
	    		<div className="container-fluid">
	    			
	    			<div className="navbar-header">
	    				<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				        <span className="sr-only">Toggle navigation</span>
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>
				      </button>
				      <a className="navbar-brand" href="/">Sheltered</a>
	    			</div>

	    			<div className="collapse navbar-collapse">
		    			<ul className="nav navbar-nav header-signInNav">
		    				<li><Link to="/admin-signup">Sign up for an account</Link></li>
		    			</ul>
            <form className="navbar-form navbar-right form-inline">
              <div className="form-group">
               	<div id='err' className="hidden">Please Enter Email and Password</div>
						    <input className="form-control" type='email' ref='email' onChange={this.update} placeholder="username"/>
						    <input  className="form-control" type='password' ref='password' onChange={this.update} placeholder="password"/>
						    <span className='help'>{this.props.help}</span>
    						<button className="btn btn-default" type="submit" onClick={this.handleSignIn}><span className="glyphicon glyphicon-log-in"></span> Sign In</button>
              </div>
            </form>
	    			</div>

            
	    		</div>
	      </nav>
	    	





	     
	    );
	}
}

export default SignIn;
