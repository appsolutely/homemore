import React from 'react';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
			{this.props.children}
        <Footer />
      </div>
    );
  }
}

// fix for proptype validation in linter
App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
