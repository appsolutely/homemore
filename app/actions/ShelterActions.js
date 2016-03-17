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
			console.log('success!');
			this.actions.getSheltersSuccess(data);
		})
		.fail((jqXhr) => {
  			console.log('failll');
			this.actions.getSheltersFail(jqXhr);
		});

  }
}

export default alt.createActions(ShelterActions);

