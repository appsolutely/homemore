import alt from '../alt';

class OccupyActions {
	constructor() {
		this.generateActions(
			'getOccupancySuccess'
		);
	}

	getOccupancySuccess(shelterName){
		var occpancyObject = {shelters: {shelterName: 'Men Emergency Night Shelter'}}
		$.ajax({
	      type: 'POST',
	      url: '/api/fetchShelterOccupants',
	      data: occpancyObject
	  	})
	  	  .done((data) => {
	  	  	console.log('Got Occupancy!');
	  	  	this.actions.getOccupancySuccess(data);
	  	  })
				.fail((jqXhr) => {
					console.log("fail")
					this.actions.getManagerProfileFail(jqXhr);
				});
    }
}

export default alt.createActions(OccupyActions);
