import alt from '../alt';

class FooterStore {
  constructor() {
    this.characters = [];
  }

  onGetTopCharactersSuccess(data) {
    this.characters = data.slice(0, 5);
  }

  onGetTopCharactersFail(jqXhr) {
    return jqXhr;
  }
}

export default alt.createStore(FooterStore);
