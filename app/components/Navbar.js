import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
  render() {
    return (
      <div className="header">
        <Link to="/shelter" className="navbar-brand">
            NEF
          </Link>

        <div>SHELTERED</div>
          <input
            className="form-control"
            placeholder="Username"
            type="text"
          />
          <input
            className="form-control"
            placeholder="Password"
            type="text"
          />
          <button >submit</button>
          <div><a href="/signup">sign up</a></div>
      </div>
    );
  }
}

export default Navbar;
