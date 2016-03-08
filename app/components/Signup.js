var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link

class Signup extends React.Component {
  render() {
    return (
        <div className="home" >
          <div className="admin">
            <Link to='/admin-signup'>
            <button type="submit" >
              Admin
            </button>
            </Link>
          </div>
          <div className="Hobo">
            <Link to='/user-signup'>
            <button type="submit" >
              Hobo
            </button>
            </Link>
          </div>
        </div>
    );
  }
}

export default Signup;
