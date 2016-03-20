import alt from '../alt';

class HeaderActions {
	constructor() {
		this.generateActions(
			'postSignInSuccess',
			'postSignInFail'
		);
	}

	postSignIn(email, password){
		var signinObject = {'user': {password:password, email: email}}
		$.ajax({
	      type: 'POST',
	      url: '/api/signin',
	      data: signinObject
	  	})
	  	  .done((data) => {
	  	  	console.log('signed in!');
	  	  	this.actions.postSignInSuccess(data);
	  	  })
	  	  .fail((jqXhr) => {
	  	  	console.log('failed');
	  	  	this.actions.postSignInFail(jqXhr.responseJSON.message)
	  	  })
    }	
}

export default alt.createActions(HeaderActions);