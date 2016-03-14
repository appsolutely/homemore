import alt from '../alt';
import ShelterActions from '../actions/ShelterActions';

class ShelterStore {
  constructor() {
    this.bindActions(ShelterActions);
    this.shelters = [];
    this.filterText = '';
    this.womenz = false;
    this.family = false;
    this.zip = false;
  }

  onGetSheltersSuccess(data) {
    this.shelters = data;
    // console.log('I am the shelters', this.shelters);
  }

  onGetSheltersFail(jqXhr) {
    return jqXhr;
  }
}

export default alt.createStore(ShelterStore);

