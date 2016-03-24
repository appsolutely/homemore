import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';


class ShowOccupants extends React.Component{
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

// stuff
  handleAdd(id,name){
    const residentName = this.refs["name" + id].value;
    this.props.add(id,residentName);
    // console.log('I should not exist');
  }

  handleRemove(id,name){
    console.log('I am the ID to be removed', id)
    this.props.remove(id,name);
    // $('#'+unit.shelterUnitID).hide()
  }

  render(){
  	const occupants = this.props.units.map((unit) => {
      const thisName = unit.occupiedByName || 'Open';
      const adder = (e) => {e.preventDefault(); this.handleAdd(unit.shelterUnitID); };
      const remover = (e) => {e.preventDefault(); this.handleRemove(unit.occupancyID, unit.occupiedByName); };
      return (
        <div key={unit.shelterUnitID} className='occupant' id={unit.shelterUnitID}>
          <h3>Name: {thisName}</h3>
          <h4>Entrance Date: {unit.entranceDate}</h4>
          <h4>Exit Date: {unit.exitDate}</h4>
          {function(){
            if(thisName === 'Open'){
              return <div><input type="text" ref={"name" + unit.shelterUnitID}/><button className="btn btn-primary btn-xs editButton" onClick={adder}>Add Occupant</button></div> 
            }else{
              return <button className="btn btn-primary btn-xs editButton" onClick={remover}>Remove Occupant</button>
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