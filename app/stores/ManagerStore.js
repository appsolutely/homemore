import alt from '../alt';
import ManagerActions from '../actions/ManagerActions';

class ManagerStore {
	constructor(){
		this.bindActions(ManagerActions);
		this.managerObjectProfile = {};
		this.managerObjectShelters = {}

	}

	onGetManagerProfileSuccess(data){
		this.managerObjectProfile = data.user;
		this.managerObjectShelters = data.shelters;
		console.log(this.managerObjectShelters);
	}

	onGetManagerProfileFail(err){
		console.log('failed to get profile', err)
	}
}


export default alt.createStore(ManagerStore);