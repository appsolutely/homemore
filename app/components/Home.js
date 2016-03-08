import React from 'react';
import { Link } from 'react-router';

function Home() {
  return (
    <div>
      <h1>Sheltered</h1>
      <div>
        <input type="text" />

      </div>
      <Link to="/shelter">
        <button type="button">Search</button>
      </Link>
    </div>
  );
}

module.exports = Home;
