import React from 'react';
import { Link } from 'react-router';

class ShelterListings extends React.Component {
  render() {
    const rows = this.props.shelters.map((shelter) => {
      if (shelter.shelterName.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0) {
        return (
          <div key={shelter.shelterID} className="well shelterListings">
            <div className="shelterCard">
              <Link to={'/shelter/' + shelter.shelterID}>                        
                <div className="text-left">
                  <div className="org text-capitalize">
                    <p><b>{shelter.organizationName}</b></p>
                  </div>
                  <h4>
                    <span className="shelterName">
                      <b>{shelter.shelterName}</b>
                    </span>
                  </h4>
                  <h5 className="text-lowercase"> operated by
                    <span className="orgName text-capitalize">
                      <em> {shelter.organizationName}</em>
                    </span> @ the
                    <span className="locationName text-capitalize">
                      {shelter.locationName}
                    </span>
                  </h5>
                  <span className="badge">
                    {shelter.locationCity},
                    <span className="text-uppercase">
                      {shelter.locationState}
                    </span>
                  </span>
                  <h2>
                    <span className="label label-success">
                      <i className="material-icons md-48">hotel</i>
                        {shelter.total_units - shelter.occupied_units} Available
                    </span>
                  </h2>
                </div>
              </Link>
            </div>
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
