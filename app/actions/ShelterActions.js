import alt from '../alt';

class ShelterActions {
  constructor() {
    this.generateActions(
        'getSheltersSuccess',
        'getSheltersFail'
    );
  }

  getShelters() {
    $.ajax({ url: '/api/austin/shelters' })
      .done((data) => {
        this.actions.getSheltersSuccess(data);
      })
      .fail((err) => {
        this.actions.getSheltersFail(err);
      });
  }
}

export default alt.createActions(ShelterActions);

