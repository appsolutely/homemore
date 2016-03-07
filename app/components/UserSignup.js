import React from 'react';

class UserSignup extends React.Component {
  render() {
    return (
        <div className="home" >
          <input type="text" defaultValue="First Name!" />
          <input type="text" defaultValue="Last Name!" />
        </div>
    );
  }
}

export default UserSignup;
