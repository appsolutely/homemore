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
		this.block = '';
		this.signedIn = true;
		console.log(this.signedIn);
	}

	onPostSignInFail(error){
		this.block = error;
	}
}


export default alt.createStore(HeaderStore);