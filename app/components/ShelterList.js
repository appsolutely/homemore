import React from 'react';
import { Link } from 'react-router';
import ShelterStore from '../stores/ShelterStore';
import ShelterActions from '../actions/ShelterActions';


// extends React.Component no longer binds this like React.createClass, need to do it explicitly
class Shelter extends React.Component {
  constructor(props) {
    super(props);
// set initial state
    this.state = ShelterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ShelterStore.listen(this.onChange);
    ShelterActions.getShelters();
  }

  componentWillUnmount() {
    ShelterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    const shelters = this.state.shelters.map((shelter) => {
      return (
        <li key={shelter}>
          <p>I am a shelter</p>
        </li>
      );
    });


    return (
      <div className ="jumbotron col-sm-6 col-sm-offset-3 text-center">
        <p>I am a shelter</p>
        <ul>
          {shelters}
        </ul>
      </div>
    );
  }
}

export default Shelter;
