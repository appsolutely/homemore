import React from 'react';
import { Link } from 'react-router';

class ShelterListings extends React.Component {
  constructor() {
    super();
  }

  render() {
    const rows = this.props.shelters.map((shelter) => {
      if (shelter.shelterName.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0) {
        return (
          <div key={shelter.shelterID} className="well shelterCard">
						<Link to={'/shelterprofile/' + shelter.shelterName}>
              
              
                  
              <div className="text-left shelterInfo">
                  <h4>{shelter.shelterName}</h4>
                 <h5 className="text-lowercase"> operated by <em>{shelter.organizationName}</em> at {shelter.locationName}</h5>
              </div>
                

             
						</Link>
					</div>
				);
      }
    });
    return (
		<div>
			{rows}
		</div>
	);
  }
}

ShelterListings.propTypes = {
  shelters: React.PropTypes.array,
  filter: React.PropTypes.string,
};

export default ShelterListings;
