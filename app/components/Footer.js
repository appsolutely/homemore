import React from 'react';
import {Link} from 'react-router';
import FooterStore from '../stores/FooterStore'
import FooterActions from '../actions/FooterActions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = FooterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FooterStore.listen(this.onChange);
    FooterActions.getTopCharacters();
  }

  componentWillUnmount() {
    FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
      return (
      <footer>
        <div className='Footer' >
          <div>Shelter Inc.</div>
          <div>Location: Austin,TX</div>
          <div>Phone: (555)555-5555</div>
          <div>Email: Contact@Email.com</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
