var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link

function Home () {
  return (
    <div>
      <h1>Sheltered</h1>
      <div>
        <input type="text" value='austin'/>

      </div>
      <Link to='/shelter'>
        <button type='button'>Search</button>
      </Link>
    </div>
  )
}

module.exports = Home;
