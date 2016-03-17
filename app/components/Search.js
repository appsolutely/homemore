import React from 'react';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onInput(
      this.refs.filterTextInput.value,
      this.refs.gender.checked,
      this.refs.family.checked
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
            defaultChecked={this.props.women}
            onChange={this.handleChange}
          />
          Women
        </p>
        <p>
          <input type="checkbox"
            ref="family"
            defaultChecked={this.props.family}
            onChange={this.handleChange}
          />
          Families
        </p>
    </form>
    );
  }
}

SearchBar.propTypes = {
  params: React.PropTypes.object,
};

export default SearchBar;