import React from 'react';

class AdminSignup extends React.Component {
  render() {
      return (
        <div className='home' >
          <div className="admin">
            <button type="submit" >
              Admin
            </button>
          </div>
          <div className='Hobo'>
            <button type="submit" >
              Hobo
            </button>
          </div>
        </div>
    );
  }
}

export default AdminSignup;