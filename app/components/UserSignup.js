import React from 'react';

class UserSignup extends React.Component {
  render() {
    return (
      <div className ="jumbotron col-sm-6 col-sm-offset-3 text-center">
        <ul className="form-fields">
          <h2>Account Details</h2>

            <div>
            <input type="text" ref="name" placeholder="Name"/>
            </div>
              <br />
          <div>
            <input type="password" ref="password" placeholder="Password"/>
            </div>
              <br />
          <div>
            <input type="email" ref="email" placeholder="email"/>
          </div>
          <br />
          <div>
            <button className="btn -primary" >Save &amp; Continue</button>
          </div>
        </ul>
      </div>
    );
  }
}

export default UserSignup;
