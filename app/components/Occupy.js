import React from 'react'
import ManagerActions from '../actions/ManagerActions';
import ManagerStore from '../stores/ManagerStore';
import ManagerProfileView from '../components/ManagerProfileView';
import ManagerProfileEdit from '../components/ManagerProfileEdit';


class Occupy extends React.Component {
  constructor(props) {
    super(props);
    this.state = ManagerStore.getState();
    this.onChange = this.onChange.bind(this);
    this.addOccupant = this.addOccupant.bind(this);
    this.remove = this.remove.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this);
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

  addUnits(e){
    e.preventDefault();
    const theShelter = this.state.currentShelter;
    const unit = {shelterUnit: {unitSize: '2BD'},
    shelters: {shelterName: theShelter.shelterName},
    organizations: {orgName: theShelter.organizationName}};

    ManagerActions.addUnits(unit);
  }

  removeUnits(e){
    e.preventDefault();
    ManagerActions.removeUnits();
  }

  //get org from URL params
  remove(id) {
    //e.preventDefault();
    //var taskIndex = parseInt(e.target.value, 10);
    console.log('removed occupant: %d', id);
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

  handleUpdate(orgName, shelterName, dayPhone, emergencyPhone, email, locationName, streetAddress, city, state, zip, monday,
  tuesday,wednesday,thursday,friday,saturday,sunday){
    console.log("bang bang")
    this.setState({shelterInfo:{shelterInfo:{
      organizationName:orgName,
      shelterName:shelterName,
      shelterDaytimePhone:dayPhone,
      shelterEmergencyPhone:emergencyPhone,
      shelterEmail:email,
      locationName:locationName,
      locationStreet:streetAddress,
      locationCity:city,
      locationState:state,
      locationZip:zip,
      hoursMonday:monday,
      hoursTuesday:tuesday,
      hoursWednesday:wednesday,
      hoursThursday:thursday,
      hoursFriday:friday,
      hoursSaturday:saturday,
      hoursSunday:sunday
    }}
    });
			console.log(orgName, 'orgName')
    ManagerActions.updateShelter(orgName, shelterName, dayPhone, emergencyPhone, email, locationName, streetAddress, city, state, zip, monday,
    tuesday,wednesday,thursday,friday,saturday,sunday)
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
    console.log(this.state.currentShelter);
    const occupant = {
      'shelters': {'shelterName': theShelter.shelterName},
      'organizations':{'orgName': theShelter.organizationName},
      'occupancy':{name:name, entranceDate: '9/11/2001', exitDate: '9/15/2001', 'unitID': unit}
    }
    ManagerActions.addOccupant(occupant)
    //e.preventDefault();
    // this.setState({
    //   items: this.state.items.concat([this.state.task]),
    //   task: ''
    // })
    // this.stateStuff()
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
      {this.state.clicked ? <ManagerProfileEdit save={this.handleUpdate} shelterInfo={this.state.currentShelter} clicker={this.handleUserInput}/> :<ManagerProfileView shelterInfo={this.state.currentShelter} clicker={this.handleUserInput}/>}
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



//       console.log("remove");
//   }
//
//   render(){
//
//       var displayTask  = function(task, taskIndex){
//
//
//           return <li>
//               {task}
//               <button onClick= {this.deleteElement}> Delete </button>
//           </li>;
//       };
//
//       return <ul>
//           {this.props.items.map((task, taskIndex) =>
//               <li key={taskIndex}>
//                   {task}
//                   <button onClick={this.props.deleteOccupent} value={taskIndex}> Delete </button>
//               </li>
//           )}
//       </ul>;
//   }
// }

export default Occupy;
