import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <div className ="jumbotron col-sm-6 col-sm-offset-3 text-center">
      <Link to="/">
        <img src='/img/sheltered_logo.png' />
      </Link>
          <input
            placeholder="Username"
            type="text"
          />
          <input
            placeholder="Password"
            type="text"
          />
          <button >submit</button>
          <Link to="/signup">
            sign up
          </Link>
      </div>
    );
  }
}

export default Header;
