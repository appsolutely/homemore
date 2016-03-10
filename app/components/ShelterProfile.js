import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';


class ShelterProfile extends React.Component {
  componentDidMount() {
    console.log('I mounted sugar', alt.stores.ShelterStore.state);
  }

  render() {
    return (
		<div>Hi you</div>
	);
  }

}

export default ShelterProfile;

