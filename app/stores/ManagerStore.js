import alt from '../alt';
import ManagerActions from '../actions/ManagerActions';

class ManagerStore {
	constructor(){
		this.bindActions(ManagerActions);
		this.managerObjectProfile = {};
		this.managerObjectShelters = [];
		this.occupancyObject = [];
		this.help = '';
		this.currentShelter;
		this.clicked = false;
	}

	onGetManagerProfileSuccess(data){
		this.managerObjectProfile = data.user;
		this.managerObjectShelters = data.shelters;
		console.log(data);
	}

	onGetManagerProfileFail(err){
		console.log('failed to get profile', err)
	}

	onGetOccupancySuccess(response){
		this.occupancyObject = response
		console.log("** Worked **", response);
	}

	onGetOccupancyFail(err){
		this.help = err;
	}

	onAddOccupantSuccess(response){
		console.log('add occupant success', response)
		this.occupancyObject = response;
	}

	onAddOccupantFail(err){
		console.log('add occupant fail', err)
		this.help = err;
	}

	onRemoveOccupantSuccess(response){
		this.occupancyObject = response;
	}

	onRemoveOccupantFail(err){
		this.help = err;
	}


}


export default alt.createStore(ManagerStore);
