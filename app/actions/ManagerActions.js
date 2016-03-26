import alt from '../alt';

class ManagerActions {
  constructor() {
    this.generateActions(
    'getManagerProfileSuccess',
    'getManagerProfileFail',
    'getOccupancySuccess',
    'getOccupancyFail',
    'addOccupantSuccess',
    'addOccupantFail',
    'removeOccupantSuccess',
    'removeOccupantFail',
    'addUnitSuccess',
    'removeUnitSuccess',
    'addUnitFail',
    'removeUnitFail'
    );
  }

  getManagerProfile() {
    $.ajax({ url: '/api/fetchUser/' })
      .done((data) => {
        this.actions.getManagerProfileSuccess(data);
      })
      .fail((err) => {
        this.actions.getManagerProfileFail(err);
      });
  }

  getOccupancy(shelterName) {
    const occupancyObject = { shelters: { shelterName: shelterName } };
    $.ajax({
      type: 'POST',
      url: '/api/fetchShelterOccupants',
      data: occupancyObject,
    })
      .done((data) => {
        this.actions.getOccupancySuccess(data);
      })
      .fail((err) => {
        this.actions.getOccupancyFail(err.responseText.error);
      });
  }

  addOccupant(occupantObject, unitName, unitSize) {
    console.log('getting unitName in actions', unitName)
    $.ajax({
      type: 'POST',
      url: '/api/addOccupant',
      data: occupantObject,
    })
      .done((data) => {
        const addResponseObject = data;
        addResponseObject[0].unitName = unitName;
        addResponseObject[0].unitSize = unitSize;
        this.actions.addOccupantSuccess(addResponseObject);
      })
      .fail((err) => {
        this.actions.addOccupantFail(err.responseText.error);
      });
  }

  removeOccupant(occupantID) {
    $.ajax({
      type: 'POST',
      url: '/api/removeOccupant',
      data: occupantID,
    })
      .done((data) => {
        this.actions.removeOccupantSuccess(data);
      })
      .fail((err) => {
        this.actions.removeOccupantFail(err.responseJSON.error);
      });
  }

  addUnits(unit) {
    $.ajax({
      type: 'POST',
      url: '/api/addShelterUnit',
      data: unit,
    })
      .done((data) => {
        this.actions.addUnitSuccess(data);
      })
      .fail((err) => {
        this.actions.addUnitFail(err.responseJSON.error);
      });
  }

  removeUnit(unit) {
    $.ajax({
      type: 'POST',
      url: '/api/removeShelterUnit',
      data: unit,
    })
      .done((data) => {
        this.actions.removeUnitSuccess(data);
      })
      .fail((err) => {
        this.actions.removeUnitFail(err.responseJSON.error);
      });
  }

  updateShelter(orgName, shelterName, dayPhone, emergencyPhone, email, locationName, streetAddress, city, state, zip, monday,
  tuesday, wednesday, thursday, friday, saturday, sunday, currentShelterID, currentLocationID, currentHourID) {
    const updatedShelter =  { shelters:
    { shelterName: shelterName, shelterEmail: email, shelterEmergencyPhone: emergencyPhone, shelterAddress: streetAddress, shelterDayTimePhone: dayPhone, shelterID: currentShelterID},
        organizations: { orgName: orgName },
        locations:{ name: locationName, street: streetAddress, city: city, state: state, zip: zip, phone: dayPhone, locationID: currentLocationID },
        hours: { monday: monday, tuesday: tuesday, wednesday: wednesday, thursday: thursday, friday: friday, saturday: saturday, sunday: sunday, hoursID: currentHourID }
    };
    $.ajax({
      type: 'POST',
      url: '/api/updateShelter',
      data: updatedShelter,
    });
  }

}

export default alt.createActions(ManagerActions);
