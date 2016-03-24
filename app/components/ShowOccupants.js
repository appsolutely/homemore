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
    // $('#'+unit.shelterUnitID).hide()

  render(){
  	const occupants = this.props.units.map((unit) => {
      const thisName = unit.occupiedByName || 'Unit Open';
      const fund = (e) =>{e.preventDefault(); this.handleClick(unit.shelterUnitID); };
      return (
        <div key={unit.shelterUnitID} className='occupant' id={unit.shelterUnitID}>
          <h3>Occupant: {thisName}</h3>
          <h4>Entrance Date: {unit.entranceDate}</h4>
          <h4>Exit Date: {unit.exitDate}</h4>
          {function(){
            if(thisName === 'Open'){
              return <div><input type="text" ref={"name" + unit.shelterUnitID}/><button className="btn btn-primary btn-xs editButton" onClick={fund}>Add Occupant</button></div> 
            }else{
              return <button className="btn btn-primary btn-xs editButton">Remove Occupant</button>
            }
          }.call(this)}
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