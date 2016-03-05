import React from 'react'

const Header = React.createClass({
  render() {
    return(
      <div className='header'>
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

export default Header
