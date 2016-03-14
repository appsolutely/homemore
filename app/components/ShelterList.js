import React from 'react';
import { Link } from 'react-router';
import ShelterStore from '../stores/ShelterStore';
import ShelterActions from '../actions/ShelterActions';
import ShelterListing from './ShelterListings';
import Search from './Search';


// extends React.Component no longer binds this like React.createClass, need to do it explicitly
class Shelter extends React.Component {
  constructor(props) {
    super(props);
// set initial state
    this.handleUserInput = this.handleUserInput.bind(this);
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

  handleUserInput(filter, women) {
    this.setState({
      filterText: filter,
      womenz: women,
    });
  }
// shelterProfile is going to be a separate ajax call, utilizing params.id
  render() {

    return (
      <div className ="jumbotron col-sm-6 col-sm-offset-3 text-center">
        <Search
          filter={this.state.filterText}
          women={this.state.womenz}
          onInput={this.handleUserInput.bind(this)}
        />
        <ShelterListing
          filter={this.state.filterText}
          shelters={this.state.shelters}
          women={this.state.womenz}
        />
      </div>
    );
  }
}


export default Shelter;
