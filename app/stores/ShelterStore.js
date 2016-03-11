import alt from '../alt';
import ShelterActions from '../actions/ShelterActions';

class ShelterStore {
  constructor() {
    this.bindActions(ShelterActions);
    this.shelters = [];
  }

  onGetSheltersSuccess(data) {
    this.shelters = data;
    console.log('I am the shelters', this.shelters);
  }

  onGetSheltersFail(jqXhr) {
    return jqXhr;
  }
}

export default alt.createStore(ShelterStore);

