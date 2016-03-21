import alt from '../alt';
import HeaderActions from '../actions/HeaderActions';

class HeaderStore{
	constructor() {
		this.bindActions(HeaderActions);
		//validation span
		this.help = '';
		this.signedIn = false;
	}

	onPostSignInSuccess(response){
		this.help = '';
		this.signedIn = true;
		console.log(this.signedIn);
	}

	onPostSignInFail(error){
		console.log('i am the error', error)
		this.help = error;
	}
}


export default alt.createStore(HeaderStore);