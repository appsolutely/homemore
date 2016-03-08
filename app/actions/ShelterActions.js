import alt from '../alt';

class ShelterActions {
  constructor() {
    this.generateActions(
		'getSheltersSuccess'
	);
  }

  getShelters() {
    $.ajax({ url: '/api/shelters/' })
		.done((data) => {
			console.log('success!');
			this.actions.getSheltersSuccess(data);
		})
		.fail((jqXhr) => {
  			console.log('failll');
			this.actions.getSheltersFail(jqXhr);
		});
		// return{
		// 	shelters: ['arch','others']
		// }
  }
}

export default alt.createActions(ShelterActions);

