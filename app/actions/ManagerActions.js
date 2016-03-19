import alt from '../alt';

class ManagerActions {
	constructor() {
	  this.generateActions(
	  	'getManagerProfileSuccess'
	  );
	}

	getManagerProfile() {
		$.ajax({ url: '/api/fetchUser/' })
	       .done((data) => {
	         this.actions.getManagerProfileSuccess(data);
	       })
	       .fail((jqXhr) => {
	         this.actions.getManagerProfileFail(jqXhr);
	       });
		}
}



export default alt.createActions(ManagerActions);