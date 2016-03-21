import alt from '../alt';

class OccupyActions {
	constructor() {
		this.generateActions(
			'getOccupancySuccess'
		);
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
			this.actions.getOccupancyFail(jqXhr.responseJSON.error);
		  });
    }

    addOccupant(occupantObject){
		$.ajax({
	      type: 'POST',
	      url: '/api/addOccupant',
	      data: occupancyObject
	  	})
	  	  .done((data) => {
	  	  	console.log('Got Occupancy!',data);
	  	  	this.actions.addOccupantSuccess(data);
	  	  })
		  .fail((jqXhr) => {
			console.log("fail")
			this.actions.addOccupantFail(jqXhr.responseJSON.error);
		  });    	
    }

    removeOccupant(occupantObject){
		$.ajax({
	      type: 'POST',
	      url: '/api/removeOccupant',
	      data: occupancyObject
	  	})
	  	  .done((data) => {
	  	  	console.log('Got Occupancy!',data);
	  	  	this.actions.removeOccupantSuccess(data);
	  	  })
		  .fail((jqXhr) => {
			console.log("fail")
			this.actions.removeOccupantFail(jqXhr.responseJSON.error);
		  });    	
    }
}

export default alt.createActions(OccupyActions);
