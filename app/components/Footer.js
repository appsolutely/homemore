import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className ="jumbotron col-sm-6 col-sm-offset-3 text-center">
          <div>Shelter Inc.</div>
          <div>Location: Austin,TX</div>
          <div>Phone: (555)555-5555</div>
          <div>Email: Contact@Email.com</div>
          <div><a href="https://github.com/appsolutely/sheltered">GitHub</a></div>
        </div>
      </footer>
    );
  }
}

export default Footer;
