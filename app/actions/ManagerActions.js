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
	       .fail((jqXhr) => {
	         this.actions.getManagerProfileFail(jqXhr);
	       });
	}

	getOccupancy(shelterName) {
		var occupancyObject = {shelters: {shelterName: shelterName}}
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
			console.log('fail')
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
		console.log('fail', jqXhr)
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
		console.log('fail', jqXhr);
		this.actions.removeOccupantFail(jqXhr.responseJSON.error);
	  });    	
  }

  addUnits(unit) {
  	$.ajax({
      type: 'POST',
      url: '/api/addShelterUnit',
      data: unit,
  	})
	  .done((data) => {
	  	console.log('added unit!', data);
	  	this.actions.addUnitSuccess(data);
	  })
	  .fail((jqXhr) => {
			console.log('fail', jqXhr);
			this.actions.addUnitFail(jqXhr.responseJSON.error);
	  }); 
  }

  removeUnit(unit) {
  	$.ajax({
      type: 'POST',
      url: '/api/removeShelterUnit',
      data: unit,
  	})
	  .done((data) => {
	  	console.log('added unit!', data);
	  	this.actions.removeUnitSuccess(data);
	  })
		.fail((jqXhr) => {
			console.log('fail', jqXhr);
			this.actions.removeUnitFail(jqXhr.responseJSON.error);
		});
  }

}



export default alt.createActions(ManagerActions);