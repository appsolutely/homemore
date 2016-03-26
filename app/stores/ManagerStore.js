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
		this.occupancyObject = response;
		//console.log("** Worked **", response);
	}

	onGetOccupancyFail(err){
		this.help = err;
	}

	onAddOccupantSuccess(response){
		console.log('in the manager store, unitName is', response);
		const id = response[0].fk_shelterUnitID;
		this.occupancyObject = this.occupancyObject.concat(response);
		console.log(this.occupancyObject)
		this.occupancyObject = this.occupancyObject.filter((unit)=>{
			return unit.shelterUnitID !== id;
		});
		//this.occupancyObject.push(response);
	}

	onAddOccupantFail(err){
		console.log('add occupant fail', err)
		this.help = err;
	}

	onRemoveOccupantSuccess(response){
		const updateState = response[0];
		this.occupancyObject = this.occupancyObject.map((unit) => {
			if(unit.occupiedByName === updateState.occupiedByName) {
				unit.entranceDate = null;
				unit.exitDate = null;
				unit.occupancyID = null;
				unit.occupiedByName = null;
			}
			return unit;
		});
	}

	onRemoveOccupantFail(err){
		this.help = err;
	}

	onAddUnitSuccess(response){
			this.occupancyObject = this.occupancyObject.concat(response);
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
