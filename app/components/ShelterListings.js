import React from 'react';

class ShelterListings extends React.Component {
  constructor() {
    super();
  }

	render() {
		const rows = this.props.shelters.map((shelter,i) =>{
			if (shelter.shelterName.indexOf(this.props.filter) >= 0){
				console.log(shelter);
				return(
					<div key={shelter.locationName}>
						<p>{shelter.shelterName}</p>
					</div>
				)
			}
		});
		return (
		<div className="shelterCard">
			{rows}	
		</div>
		);
	}
}

export default ShelterListings;

// class ShelterListings extends React.Component {
//   constructor() { 
//     super()
//   }

//   render() {
//   	const rows = this.props.shelters.map((shelter) => {
//   		return this.props.filter;
//   	 })
//     return (
//     	<div>
//     		steve
//     		{this.props.filter}
//     	</div>
//     );
//   }
// }

// export default ShelterListings;