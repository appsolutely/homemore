import React from 'react';
import { Link } from 'react-router';

function Home() {
  return (
    <div className ="well col-sm-6 col-sm-offset-3 text-center">
      <div>
        <input type="text" />
      <Link to="/shelter">
        <button type="button">Search</button>
      </Link>

      </div>
    </div>
  );
}

module.exports = Home;
