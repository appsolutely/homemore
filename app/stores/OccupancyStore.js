import alt from '../alt';
import OccpancyActions from '../actions/OccpancyActions';

class OccupancyStore{
	constructor() {
		this.bindActions(OccpancyActions);
		this.occupancyObject = []
	}

	onGetOccupancySuccess(response){
		this.occupancyObject = response
		console.log("** Worked **");
	}
}


export default alt.createStore(OccupancyStore);
