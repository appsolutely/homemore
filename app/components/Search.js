import React from 'react';

class SearchBar extends React.Component {
  constructor() { 
    super()
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
          <input type="checkbox" 
            ref="gender" 
            checked={this.props.women} 
            onChange={this.handleChange}
          />
          {' '}
          Womenz
        </p>
    </form>
    );
  }
}

export default SearchBar;