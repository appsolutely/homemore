import React from 'react'

const Home = React.createClass({
  render() {
    return(
      <div className='home'>
        <br />
        <br />
        <div className='search'>
          <input type="text" defaultValue="Austin" />
        </div>
      </div>
    )
  }
})

export default Home
