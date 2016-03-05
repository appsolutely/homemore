import React from 'react'

const Home = React.createClass({
  render() {
    return(
      <div className='home'>
        <div>SHELTERED</div>
          <input
            className="form-control"
            placeholder="Username"
            type="text" />
          <input
            className="form-control"
            placeholder="Password"
            type="text" />
      </div>
    )
  }
})

export default Home
