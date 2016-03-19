import alt from '../alt';
import HeaderActions from '../actions/HeaderActions';

class HeaderStore{
	constructor() {
		this.bindActions(HeaderActions);
		//validation span
		this.block = '';
		this.signedIn = false;
	}

	onPostSignInSuccess(response){
		console.log(response);
		this.block = '';
		this.signedIn = true;
	}

	onPostSignInFail(error){
		console.log(error);
		this.block = error;
	}
}


export default alt.createStore(HeaderStore);