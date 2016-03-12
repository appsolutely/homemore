import React from 'react';
import { Link } from 'react-router';
import ShelterStore from '../stores/ShelterStore';
import ShelterActions from '../actions/ShelterActions';
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

  handleClick(i) {
    console.log('You clicked: ', i);
  }

  handleUserInput(filter, inStockOnly) {
    this.setState({
      filterText: filter,
      womenz: inStockOnly
    });
  }
// shelterProfile is going to be a separate ajax call, utilizing params.id
  render() {
    console.log('bound to this, it is', this.handleUserInput)
    const shelters = this.state.shelters.map((shelter, i) => {
      const bound = this.handleClick.bind(this, i);
      return (
        <div key={shelter.shelterName} className="shelterCard" onClick={bound}>
          <Link to={"/shelterprofile/" + shelter.shelterName}>
            <p>{shelter.shelterName}</p>
          </Link>
        </div>
      );
    });


    return (
      <div className ="jumbotron col-sm-6 col-sm-offset-3 text-center">
        <SearchBar
          filter={this.state.filterText}
          women={this.state.womenz}
          onInput={this.handleUserInput.bind(this)}
        />
        <p>List of Shelters</p>
        <ul>
          {shelters}
        </ul>
      </div>
    );
  }
}


class SearchBar extends React.Component {
  constructor() { 
    super()
    console.log(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    //console.log(this)
    this.props.onInput (
      this.refs.filterTextInput.value,
      this.refs.gender.checked
    );
  }
  render() {
    return (
    <form>
        <input type="text"
          placeholder="Search..."
          value={this.props.filter}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        <p>
          <input type="checkbox" ref="gender" checked={this.props.women} />
          {' '}
          Womenz
        </p>
    </form>
    );
  }
}



export default Shelter;
