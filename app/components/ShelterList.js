import React from 'react';
import { Link } from 'react-router';
import ShelterStore from '../stores/ShelterStore';
import ShelterActions from '../actions/ShelterActions';
import ShelterProfile from './ShelterProfile';

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
// shelterProfile is going to be a separate ajax call, utilizing params.id
  render() {
    const shelters = this.state.shelters.map((shelter) => {
      return (
        <div key={shelter.shelterName} className="shelterCard">
            <p>{shelter.shelterName}</p>
        </div>
      );
    });


    return (
      <div className ="jumbotron col-sm-6 col-sm-offset-3 text-center">
        <p>List of Shelters</p>
        <ul>
          {shelters}
        </ul>
      </div>
    );
  }
}

export default Shelter;
