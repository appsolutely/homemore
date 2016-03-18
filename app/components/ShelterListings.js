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
                  <div className="org text-capitalize"><p><b>{shelter.organizationName}</b></p></div>
                  <h4><span className="shelterName"><b>{shelter.shelterName}</b></span></h4>
                  <h5 className="text-lowercase"> operated by 
                    <span className="orgName text-capitalize">
                      <em> {shelter.organizationName}</em>
                    </span> @ the 
                    <span className="locationName text-capitalize"> {shelter.locationName}
                    </span>
                  </h5>
                    <h4><span className="label label-success">{shelter.total_units - shelter.occupied_units} Available Units</span></h4>
                  
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
