import React from 'react'
import ManagerActions from '../actions/ManagerActions';
import ManagerStore from '../stores/ManagerStore';
import ManagerProfileView from '../components/ManagerProfileView';
import ManagerProfileEdit from '../components/ManagerProfileEdit';
import ManageUnits from '../components/ManageUnits'


class Occupy extends React.Component {
  constructor(props) {
    super(props);
    this.state = ManagerStore.getState();
    this.onChange = this.onChange.bind(this);
    this.addOccupant = this.addOccupant.bind(this);
    this.remove = this.remove.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.addUnits = this.addUnits.bind(this);
  }

  componentWillMount(){
      var unit = this.props.params.id;
    //find current shelter
      this.state.managerObjectShelters.some((shelter) => {
      this.state.currentShelter = shelter;
      return shelter.shelterID == unit;
    })
  }

  componentDidMount(){
    ManagerStore.listen(this.onChange);
    ManagerActions.getOccupancy(this.state.currentShelter.shelterName);
  }

  addUnits(unit){
    console.log('getting clicked', unit)
    ManagerActions.addUnits(unit);
  }

  removeUnits(e){
    e.preventDefault();
    ManagerActions.removeUnits();
  }

  //get org from URL params
  remove(id) {
    ManagerActions.removeOccupant(id);
    // this.setState(state => {
    //   state.items.splice(taskIndex, 1);
    //   return {items: state.items};
    // });
  }

  onChange(state) {
    this.setState(state);
  }

  componentWillUnmount(){
    ManagerStore.unlisten(this.onChange)
  }

  handleUserInput(click) {
    console.log('click click', click)
    this.setState({
      clicked: click,
    })
  }


// function FindOneShelterByID(arrayOfShelters, find){
//   var theShelter;

//   arrayOfShelters.some((shelter) => {
//     if(shelter.shelterID === find){
//       theShelter = shelter
//     }
//   })
//   return theShelter;
// }
//{occupancy{name:'Joe', entranceDate: ???, exitDate: ???, unitID: ??}}
  addOccupant(e){
    console.log('are we even making it here??????');
    e.preventDefault();
    const name = this.refs.add.value;
    const theShelter = this.state.currentShelter;
    const unit = this.props.params.id;
    const occupant = {
      'shelters': {'shelterName': theShelter.shelterName},
      'organizations':{'orgName': theShelter.organizationName},
      'occupancy':{name:name, entranceDate: '9/11/2001', exitDate: '9/15/2001', 'unitID': unit}
    }
    ManagerActions.addOccupant(occupant)
  }


  render(){
    const occupants = this.state.occupancyObject.map((person) => {
      const bound = this.remove.bind(this, person.occupancyID)
      return (
        <div key={person.occupancyID} className='occupant'>
          <h3>{person.occupiedByName}</h3>
          <h4>Entrance Date: {person.entranceDate}</h4>
          <h4>Exit Date: {person.exitDate}</h4>
          <button className="btn btn-primary editButton" onClick={bound}>Remove</button>
        </div>
      );
    })
    return (
      <div className ="col-sm-6 col-sm-offset-3 text-center">
      {this.state.clicked ? <ManagerProfileEdit shelterInfo={this.state.currentShelter} clicker={this.handleUserInput}/> :<ManagerProfileView shelterInfo={this.state.currentShelter} clicker={this.handleUserInput}/>}
        <ManageUnits shelter={this.state.currentShelter} add={this.addUnits}/>
        <h1>Add occupants</h1>
          <form>
            <input type="text" ref="add"/>
            <button className="btn btn-primary editButton" onClick={this.addOccupant}>Add Occupant</button>
          </form>
          <h2>Current Occupants</h2>
          {occupants}
      </div>
    );
  }
}


export default Occupy;
