import alt from '../alt';

class OccupyActions {
	constructor() {
		this.generateActions(
			'getOccupancySuccess',
			'getOccupancyFail',
			'addOccupantSuccess',
			'addOccupantFail',
			'removeOccupantSuccess',
			'removeOccupantFail'
		);
	}

	updateShelter(orgName, shelterName, dayPhone, emergencyPhone, email, locationName, streetAddress, city, state, zip, monday,
	tuesday,wednesday,thursday,friday,saturday,sunday){
	let updatedShelter =	{shelters:
	      {shelterName: shelterName, shelterEmail: email, shelterEmergencyPhone: emergencyPhone, shelterAddress: streetAddress, shelterDayTimePhone: dayPhone},
	      organizations: orgName,
	      locations:{name: locationName, street: streetAddress, city: city, state: state, zip: zip, phone: dayPhone},
	      hours: {monday: monday, tuesday: tuesday, wednesday: wednesday, thursday: thursday, friday: friday, saturday: saturday, sunday: sunday}
	    }

			$.ajax({
	      type: 'POST',
	      url: '/api/updateShelter',
	      data: updatedShelter
	    })
	}

	getOccupancy(shelterName){
		var occupancyObject = {shelters: {shelterName: 'Men Emergency Night Shelter'}}
		$.ajax({
	      type: 'POST',
	      url: '/api/fetchShelterOccupants',
	      data: occupancyObject
	  	})
	  	  .done((data) => {
	  	  	console.log('Got Occupancy!',data);
	  	  	this.actions.getOccupancySuccess(data);
	  	  })
		  .fail((jqXhr) => {
			console.log("fail")
			this.actions.getOccupancyFail(jqXhr.responseText.error);
		  });
    }

    addOccupant(occupantObject){
		$.ajax({
	      type: 'POST',
	      url: '/api/addOccupant',
	      data: occupantObject
	  	})
	  	  .done((data) => {
	  	  	console.log('added occupant!',data);
	  	  	this.actions.addOccupantSuccess(data);
	  	  })
		  .fail((jqXhr) => {
			console.log("fail", jqXhr)
			this.actions.addOccupantFail(jqXhr.responseText.error);
		  });
    }

    removeOccupant(occupantID){
		$.ajax({
	      type: 'POST',
	      url: '/api/removeOccupant',
	      data: occupantID
	  	})
	  	  .done((data) => {
	  	  	console.log('removed occupant!',data);
	  	  	this.actions.removeOccupantSuccess(data);
	  	  })
		  .fail((jqXhr) => {
			console.log("fail", jqXhr)
			this.actions.removeOccupantFail(jqXhr.responseJSON.error);
		  });
    }
}

export default alt.createActions(OccupyActions);
