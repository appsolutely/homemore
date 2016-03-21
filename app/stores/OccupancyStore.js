import alt from '../alt';
import OccupancyActions from '../actions/OccupancyActions';

class OccupancyStore{
	constructor() {
		this.bindActions(OccupancyActions);
		this.occupancyObject = [];
		this.help = ''
	}

	onGetOccupancySuccess(response){
		console.log('I am the occupancy success object',response)
		this.occupancyObject = response
		console.log("** Worked **");
	}

	onGetOccupancyFail(err){
		this.help = err;
	}

	onAddOccupantSuccess(response){
		this.occupancyObject = response;
	}


	onAddOccupantFail(err){
		this.help = err;
	}


	onRemoveOccupantSuccess(response){
		this.occupancyObject = response;;
	}

	onRemoveOccupantFail(err){
		this.help = err;
	}

}


export default alt.createStore(OccupancyStore);
