import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';


class ShowOccupants extends React.Component{
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
  }


  render(){
  	const occupants = this.props.units.map((unit) => {
      const thisName = unit.occupiedByName || 'Open';
      return (
        <div key={unit.shelterUnitID} className='occupant'>
          <h3>Name: {thisName}</h3>
          <h4>Entrance Date: {unit.entranceDate}</h4>
          <h4>Exit Date: {unit.exitDate}</h4>
          <input type="text" ref="add"/>
          <button className="btn btn-primary editButton">Add Occupant</button>
          <button className="btn btn-primary editButton">Remove</button>
        </div>
      );
    })
  	return(
  		<div>
  			<h1>Stuff Here</h1>
  			{occupants}
  		</div>
  	)
  }

}



export default ShowOccupants;