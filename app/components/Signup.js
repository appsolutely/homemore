import React from 'react';
// var ReactRouter = require('react-router');
import { Link } from 'react-router';

class Signup extends React.Component {
  render() {
    return (
        <div className ="well col-sm-6 col-sm-offset-3 text-left">
          <div className="admin">
            <Link to="/admin-signup" className="admin">
            <button type="submit" >
              Admin
            </button>
            </Link>
            <Link to="/user-signup" className="public-user">
            <button type="submit" >
              Public
            </button>
            </Link>
          </div>
        </div>
    );
  }
}

export default Signup;
