import alt from '../alt';

class ManagerActions{
	constructor() {
	  this.generateActions(
	  	'getManagerProfileSuccess'
	  );
	}

	getManagerProfile() {
		$.ajax({ url: '/api/fetchUser/' })
	       .done((data) => {
	         this.actions.getUserSuccess(data);
	       })
	       .fail((jqXhr) => {
	         this.actions.getUserFail(jqXhr);
	       });
		}
}



export default alt.createActions(ManagerActions);