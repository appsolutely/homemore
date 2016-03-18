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
    <div className="well text-left">
        <h4>Search Shelters:</h4>
        <div><input type="text"
          placeholder="start typing here..."
          value={this.props.filter}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        </div>
        <br/>
        <div>
        <div>
        <h4>Filter by: </h4>
        </div>
        <span className="filterOpt">
          <input type="checkbox"
            ref="gender"
            defaultChecked={this.props.women}
            onChange={this.handleChange}
          />
          Women
        </span>
        <span className="filterOpt">
          <input type="checkbox"
            ref="family"
            defaultChecked={this.props.family}
            onChange={this.handleChange}
          />
          Families
        </span>
        
        </div>
    </div> 
    );
  }
}

SearchBar.propTypes = {
  params: React.PropTypes.object,
};

export default SearchBar;