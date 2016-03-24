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
		this.unitObject = [];
		this.clicked = false;
		this.mounted = false;
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
		//console.log("** Worked **", response);
	}

	onGetOccupancyFail(err){
		this.help = err;
	}

	onAddOccupantSuccess(response){
		const id = response[0].fk_shelterUnitID;
		this.occupancyObject = this.occupancyObject.concat(response);
		this.occupancyObject = this.occupancyObject.filter((unit)=>{
			return unit.shelterUnitID !== id;
		})
		//this.occupancyObject.push(response);
	}

	onAddOccupantFail(err){
		console.log('add occupant fail', err)
		this.help = err;
	}

	onRemoveOccupantSuccess(response){
		this.occupancyObject.push(response);
	}

	onRemoveOccupantFail(err){
		this.help = err;
	}

	onAddUnitSuccess(response){
		console.log('add unit success', response);
		this.unitObject = response;
	}

	onRemoveUnitSuccess(response){
		console.log('remove unit success ', response);
		this.unitObject = response;
	}

	onAddUnitFail(err){
		console.error('add unit fail ', err);
		this.help = err;
	}

	onRemoveUnitFail(err){
		console.error('remove unit fail ', err);
		this.help = err;
	}


}


export default alt.createStore(ManagerStore);
