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
  // on load, will fetch list of shelters - this needs to happen every load to maintain bedcount
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

  handleUserInput(filter, women, family, zip) {
    this.setState({
      filterText: filter,
      women: women,
      family: family,
    });
  }
// shelterProfile is going to be a separate ajax call, utilizing params.id
  render() {
    var shelterData = this.state.shelters;
    var totalUnitsAvailable=0;
    for (var i=0;i<shelterData.length;i++){
      totalUnitsAvailable+=(shelterData[i].total_units - shelterData[i].occupied_units);
    }

    return (
      <div className ="well col-sm-6 col-sm-offset-3 text-right">
      <h2><span className="label label-success"><i className="material-icons md-48">hotel</i> {totalUnitsAvailable} Units Available</span></h2>
        <Search
          filter={this.state.filterText}
          women={this.state.women}
          family={this.state.family}
          onInput={this.handleUserInput}
        />
        <ShelterListing
          filter={this.state.filterText}
          shelters={this.state.shelters}
          women={this.state.women}
          family={this.state.family}
        />
      </div>
    );
  }
}


export default Shelter;
