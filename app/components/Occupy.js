import React from 'react'
import ManagerActions from '../actions/ManagerActions';
import ManagerStore from '../stores/ManagerStore';
import ManagerProfileView from '../components/ManagerProfileView';
import ManagerProfileEdit from '../components/ManagerProfileEdit';
import ManageUnits from '../components/ManageUnits';
import ShowOccupants from '../components/ShowOccupants';


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

  // stuff

  componentWillMount(){
    var unit = this.props.params.id;
    //find current shelter
    this.state.managerObjectShelters.some((shelter) => {
      this.state.currentShelter = shelter;
      return shelter.shelterID == unit;
    })   
    ManagerActions.getOccupancy(this.state.currentShelter.shelterName);
  }

  componentDidMount(){
    ManagerStore.listen(this.onChange);
    console.log('in componentDidMount', this.state.currentShelter.shelterName)
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

    this.setState({currentShelter:{
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
    }
    });
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
// 
//  {this.state.occupancyObject ? <ShowOccupants add={this.addOccupant} units={this.state.occupancyObject} /> : <div>Loading ...</div> }
//{occupancy{name:'Joe', entranceDate: ???, exitDate: ???, unitID: ??}}
  addOccupant(id){
    const name = this.refs.add.value;
    const theShelter = this.state.currentShelter;
    const unit = id;
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
    return (
      <div className ="col-sm-6 col-sm-offset-3 text-center">
      {this.state.clicked ? <ManagerProfileEdit shelterInfo={this.state.currentShelter} clicker={this.handleUserInput}/> :<ManagerProfileView shelterInfo={this.state.currentShelter} clicker={this.handleUserInput}/>}
        <ManageUnits shelter={this.state.currentShelter} add={this.addUnits}/>
          <h2>Current Occupants</h2>
          <ShowOccupants add={this.addOccupant} units={this.state.occupancyObject} />
      </div>
    );
  }
}



export default Occupy;
