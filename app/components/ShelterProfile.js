import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';


class ShelterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = alt.stores.ShelterStore.state;
  }
  componentDidMount() {
    console.log('shelter name', this.props.params.id);
    console.log('I mounted sugar', alt.stores.ShelterStore.state);
  }

  render() {
    const theShelter = this.state.shelters.filter((shelter) => {
      console.log(shelter.shelterName.toLowerCase())
      return shelter.shelterName.toLowerCase() === this.props.params.id.toLowerCase();
    })[0];
     // console.log('var should be ', theShelter)
    return (
		<div className="shelterProfile">
			<h3>{theShelter.shelterName}</h3>
			<h4>{theShelter.shelterDaytimePhone}</h4>
		</div>
	);
  }
}

// fixes
ShelterProfile.propTypes = {
  params: React.PropTypes.object,
};

export default ShelterProfile;

