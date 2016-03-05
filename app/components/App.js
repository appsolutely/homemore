import React from 'react';
import Header from './Header';
import Footer from './Footer';

const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
        	{this.props.children}
        <Footer />
      </div>
    )
  }
})

export default App
