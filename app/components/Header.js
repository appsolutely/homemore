import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
      <Link to="/"><div>SHELTERED</div></Link>
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
          <Link to="/signup">
            sign up
          </Link>
      </div>
    );
  }
}

export default Header;
