import React from 'react';
import { Link } from 'react-router';

class ShelterListings extends React.Component {
  constructor() {
    super();
  }

	render() {
		const rows = this.props.shelters.map((shelter,i) =>{
			if (shelter.shelterName.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0){
				console.log(shelter);
				return(
					<div key={shelter.shelterID} className='shelterCard'>
						<Link to={"/shelterprofile/" + shelter.shelterName}>
							<p>{shelter.shelterName}</p>
						</Link>
					</div>
				)
			}
		});
		return (
		<div>
			{rows}	
		</div>
		);
	}
}

export default ShelterListings;
