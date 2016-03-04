import React from 'react'
import Footer from './Footer';

const App = React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
        <Footer />
      </div>
    )
  }
})

export default App
