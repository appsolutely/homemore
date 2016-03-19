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
	      data: signinObject,
	        success: function(data){
	        $( ".loginFields" ).hide();
	        $( ".welcome" ).show();
	        },
	        fail: function(err){
	          console.log('err', err);
	        }
    	})
	}
}


//update for done/fail
//
export default alt.createActions(HeaderActions);