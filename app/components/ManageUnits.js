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
        <form>
          <label>Number of Bedrooms in New Unit</label>
          <input type='text' ref='beds' placeholder='i.e. 2 bedrooms' />
          <button className="btn btn-primary editButton" onClick={this.addUnits}>Add Unit</button>
        </form>
    );
  }
}



export default ManageUnits;
