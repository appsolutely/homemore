import React from 'react';
// import { Link } from 'react-router';
import ShelterStore from '../../stores/ShelterStore';
import ShelterActions from '../../actions/ShelterActions';
import ShelterListing from './ShelterListings';
import Search from './Search';

// extends React.Component no longer binds this like React.createClass, need to do it explicitly
class Shelter extends React.Component {
  constructor(props) {
    super(props);
    this.state = ShelterStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
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

// receives filter text from search child component
  handleUserInput(filter) {
    this.setState({
      filterText: filter,
    });
  }

// shelterProfile is going to be a separate ajax call, utilizing params.id
  render() {
    const shelterData = this.state.shelters;
    let totalUnitsAvailable = 0;
    shelterData.forEach((unit) => {
      totalUnitsAvailable += (unit.total_units - unit.occupied_units);
    });
    return (
      <div className ="well col-sm-6 col-sm-offset-3 text-right">
        <h2>
          <span className="label label-success">
            <i className="material-icons md-48">hotel</i>
              {totalUnitsAvailable} Units Available
          </span>
        </h2>
        <Search
          filter={this.state.filterText}
          onInput={this.handleUserInput}
        />
        <ShelterListing
          filter={this.state.filterText}
          shelters={this.state.shelters}
        />
      </div>
    );
  }
}


export default Shelter;
