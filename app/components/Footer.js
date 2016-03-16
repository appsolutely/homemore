import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className ="well col-sm-6 col-sm-offset-3 text-center">
          <div>Sheltered Inc.</div>
          <div>Made with love in Austin,TX</div>
          <div><a href="mailto:appsolutelysheltered@gmail.com">appsolutelysheltered@gmail.com</a></div>
          <div>see the code on <a href="https://github.com/appsolutely/sheltered">github</a></div> 
        </div>
      </footer>
    );
  }
}

export default Footer;
