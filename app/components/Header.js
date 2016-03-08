var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link

const Header = React.createClass({
  render() {
    return(
      <div className='header'>
      <Link to='/'><div>SHELTERED</div></Link>
          <input
            className="form-control"
            placeholder="Username"
            type="text" />
          <input
            className="form-control"
            placeholder="Password"
            type="text" />
          <button >submit</button>
          <Link to='/signup'>
            sign up
          </Link>
      </div>
    )
  }
})

export default Header
