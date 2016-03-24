import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class ManageUnits extends React.Component {
  constructor(props) {
    super(props);
    this.addUnits = this.addUnits.bind(this);
  }

// stuff
  
  addUnits(e){
    e.preventDefault();
    console.log('adding a unit without click')
    const theShelter = this.props.shelter;
    console.log(theShelter);
    //clean up everything that isn't a number
    const theBeds = this.refs.beds.value.split('').filter((num) => parseInt(num));
    theBeds.push('BD');
    const unit = {shelterUnit: {unitSize: theBeds.join('')}, 
    shelters: {shelterName: theShelter.shelterName}, 
    organizations: {orgName: theShelter.organizationName}};
    this.props.add(unit);
    //ManagerActions.addUnits(unit);
  }

  removeUnits(e){
    e.preventDefault();
    //need to pass it shelterUnitID
    ManagerActions.removeUnits();
  }


  render(){
    return (
      <div>
        <form className="well form-inline">
        <span><h3>Add Units</h3></span>
          <span className="selectUnits"><span>Beds per unit: </span>
              <select className="form-control selectWidth" ref='beds'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
          </span>
          <input type="text" ref=''></input>
          <button className="btn btn-primary btn-sm editButton" onClick={this.addUnits}>Add Unit</button>
        </form>
      </div>
    );
  }
}



export default ManageUnits;
