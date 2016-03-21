import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class SignedInNav extends React.Component {
	constructor(props){
		super(props)
		this.logOut = this.logOut.bind(this);
	}
    

    logOut(e){
      e.preventDefault(e);
      document.cookie = "sessionId" + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.href = "../";
  	}


	render(){
		return(
			<div>
             <ul className='header-signedInNav'>
               <li><Link to='/admin-profile'>Admin Profile</Link></li>
               <li><Link to='/manager-profile'>Manager Profile</Link></li>
             </ul>
	      	  <div className="welcome text-right">
	            <Link to="/user-profile"> My Account </Link>
	            <button className="btn btn-primary" type='button' onClick={this.logOut}>Log Out</button>
	          </div>
	        </div>
		)
	}
}

export default SignedInNav;