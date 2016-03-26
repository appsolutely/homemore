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
    this.removeOccupant = this.removeOccupant.bind(this);
    this.remove = this.remove.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addUnits = this.addUnits.bind(this);
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
    const unit = {shelterUnit: {unitSize: e.shelterUnit.unitSize, unitName: e.shelterUnit.unitName},
    shelters: {shelterName: e.shelters.shelterName},
    organizations: {orgName: e.organizations.orgName}};

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
    var currentShelterID = this.state.currentShelter.shelterID;
    var currentLocationID = this.state.currentShelter.locationID
    var currentHourID = this.state.currentShelter.hoursID
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
      hoursSunday:sunday,
      shelterID: this.state.currentShelter.shelterID,
      locationID: currentLocationID,
      hoursID: currentHourID

    }
    });
    ManagerActions.updateShelter(orgName, shelterName, dayPhone, emergencyPhone, email, locationName, streetAddress, city, state, zip, monday,
    tuesday,wednesday,thursday,friday,saturday,sunday,currentShelterID, currentLocationID, currentHourID)
  }

  addOccupant(id, name, unitName, unitSize){
    const personName = name;
    const theShelter = this.state.currentShelter;
    const unit = id;
    const occupant = {
      'shelters': {'shelterName': theShelter.shelterName},
      'organizations':{'orgName': theShelter.organizationName},
      'occupancy':{name:personName, entranceDate: '9/11/2001', exitDate: '9/15/2001', 'unitID': id}
    }
    console.log('I am the occupantObject, kookookachoo', occupant)
    const stateOccupant = {entranceDate: '9/11/2001',
                           exitDate: '9/15/2001',
                           occupiedByName: personName,
                           occupancyID: null,
                           shelterUnitID: id,};
    ManagerActions.addOccupant(occupant,unitName, unitSize)
  }

  removeOccupant(id,name){
    const theShelter = this.state.currentShelter;
    const unit = id;
    var occupant = {
      'shelters': {'shelterName': theShelter.shelterName},
      'organizations':{'orgName':theShelter.organizationName},
      'occupant':unit
    }
    // var occupantID = {occupant:id}
    ManagerActions.removeOccupant(occupant);
    console.log('receiving the name: ',name)
  }
  // /

  render(){
    return (
      <div className ="well col-sm-6 col-sm-offset-3 text-left">
      {this.state.clicked ? <ManagerProfileEdit save={this.handleUpdate} shelterInfo={this.state.currentShelter} clicker={this.handleUserInput}/> :<ManagerProfileView shelterInfo={this.state.currentShelter} clicker={this.handleUserInput}/>}
        <ManageUnits shelter={this.state.currentShelter} add={this.addUnits}/>
          <div className="well">
          <h3>Current Occupancy</h3>
          <ShowOccupants add={this.addOccupant} remove={this.removeOccupant} units={this.state.occupancyObject} />
        </div>
      </div>
    );
  }
}


export default Occupy;
