import React from 'react';
import { Link } from 'react-router';

function Home() {
  return (
    <div className ="jumbotron col-sm-6 col-sm-offset-3 text-center defaultShelter">
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
