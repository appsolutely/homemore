import React from 'react';
import ManagerActions from '../../actions/ManagerActions';
import ManagerStore from '../../stores/ManagerStore';
import ManagerProfileView from './ManagerProfileView';
import ManagerProfileEdit from './ManagerProfileEdit';
import ManageUnits from './ManageUnits';
import ShowOccupants from './ShowOccupants';


class ManageOccupants extends React.Component {
  constructor(props) {
    super(props);
    this.state = ManagerStore.getState();
    this.onChange = this.onChange.bind(this);
    this.addOccupant = this.addOccupant.bind(this);
    this.removeOccupant = this.removeOccupant.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addUnits = this.addUnits.bind(this);
  }

  // find current shelter based on params id
  componentWillMount() {
    const unit = this.props.params.id;
    this.state.managerObjectShelters.some((shelter) => {
      this.state.currentShelter = shelter;
      return shelter.shelterID == unit;
    });
    ManagerActions.getOccupancy(this.state.currentShelter.shelterName);
  }

  componentDidMount() {
    ManagerStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ManagerStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  // add bedroom units to shelter - passed up from ManageUnits component
  addUnits(e) {
    const unit = { shelterUnit: { unitSize: e.shelterUnit.unitSize, unitName: e.shelterUnit.unitName },
    shelters: { shelterName: e.shelters.shelterName },
    organizations: { orgName: e.organizations.orgName } };

    ManagerActions.addUnits(unit);
  }

  // remove bedroom units from shelter - passed up from Manage Units - future feature
  // removeUnits(e) {
  //   e.preventDefault();
  //   ManagerActions.removeUnits();
  // }

  // needed for conditional display in render
  handleUserInput(click) {
    this.setState({
      clicked: click,
    });
  }

  handleUpdate(orgName, shelterName, dayPhone, emergencyPhone, email, locationName, streetAddress, city, state, zip, monday,
  tuesday, wednesday, thursday, friday, saturday, sunday) {
    const currentShelterID = this.state.currentShelter.shelterID;
    const currentLocationID = this.state.currentShelter.locationID;
    const currentHourID = this.state.currentShelter.hoursID;
    this.setState({ currentShelter: {
      organizationName: orgName,
      shelterName: shelterName,
      shelterDaytimePhone: dayPhone,
      shelterEmergencyPhone: emergencyPhone,
      shelterEmail: email,
      locationName: locationName,
      locationStreet: streetAddress,
      locationCity: city,
      locationState: state,
      locationZip: zip,
      hoursMonday: monday,
      hoursTuesday: tuesday,
      hoursWednesday: wednesday,
      hoursThursday: thursday,
      hoursFriday: friday,
      hoursSaturday: saturday,
      hoursSunday: sunday,
      shelterID: this.state.currentShelter.shelterID,
      locationID: currentLocationID,
      hoursID: currentHourID,
      },
    });
    ManagerActions.updateShelter(orgName, shelterName, dayPhone, emergencyPhone, email, locationName, streetAddress, city, state, zip, monday,
    tuesday, wednesday, thursday, friday, saturday, sunday, currentShelterID, currentLocationID, currentHourID);
  }

  // add occupant to shelter unit - name and size must be passed so they can be appended to response
  // object that updates state
  addOccupant(id, name, unitName, unitSize) {
    const personName = name;
    const unitId = id;
    const theShelter = this.state.currentShelter;
    const occupant = {
      shelters: { shelterName: theShelter.shelterName },
      organizations: { orgName: theShelter.organizationName },
      occupancy: { name: personName, unitID: unitId },
    };
    ManagerActions.addOccupant(occupant, unitName, unitSize);
  }

  // id is the shelterUnitId (room number in db)
  // received from ShowOccupants sub-component
  removeOccupant(id) {
    const theShelter = this.state.currentShelter;
    const unit = id;
    const occupant = {
      shelters: { shelterName: theShelter.shelterName },
      organizations: { orgName: theShelter.organizationName },
      occupant: unit,
    };
    ManagerActions.removeOccupant(occupant);
  }
  // /

  render() {
    return (
      <div className ="well col-sm-6 col-sm-offset-3 text-left">
      {this.state.clicked ? <ManagerProfileEdit save={this.handleUpdate} shelterInfo={this.state.currentShelter} clicker={this.handleUserInput}/> :<ManagerProfileView shelterInfo={this.state.currentShelter} clicker={this.handleUserInput}/>}
        <ManageUnits shelter={this.state.currentShelter} add={this.addUnits} />
          <div className="well">
          <h3>Current Occupancy</h3>
          <ShowOccupants add={this.addOccupant} remove={this.removeOccupant} units={this.state.occupancyObject} />
        </div>
      </div>
    );
  }
}

export default ManageOccupants;
