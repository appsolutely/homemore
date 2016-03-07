import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <br />
        <br />
        <div className="search">
          <input type="text" defaultValue="Austin" />
        </div>
      </div>
    );
  }
}
export default Home;

