import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';


class ShowOccupants extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

// stuff
  handleClick(id,name){
    const residentName = this.refs["name" + id].value;
    this.props.add(id,residentName)
    // console.log('I should not exist');
  }

  render(){
  	const occupants = this.props.units.map((unit) => {
      const thisName = unit.occupiedByName || 'Open';
      const fund = (e) =>{e.preventDefault(); this.handleClick(unit.shelterUnitID)};
      return (
        <div key={unit.shelterUnitID} className='occupant'>
          <h3>Name: {thisName}</h3>
          <input type="text" ref={"name" + unit.shelterUnitID}/>
          <button className="btn btn-primary btn-xs editButton" onClick={fund}>Add Occupant</button>
          <button className="btn btn-primary btn-xs editButton">Remove</button>
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
//  


export default ShowOccupants;