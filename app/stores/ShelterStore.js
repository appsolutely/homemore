import alt from '../alt';
import ShelterActions from '../actions/ShelterActions'

class ShelterStore {
	constructor(){
		this.bindActions(ShelterActions);
		this.shelters = [];
	}

	onGetSheltersSuccess(data){
		this.shelters = data;
	}

	onGetSheltersFail(jqXhr){
		toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
	}
}

export default alt.createStore(ShelterStore);