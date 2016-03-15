import alt from '../alt';
import UserProfileActions from '../actions/UserProfileActions';

class UserStore {
  constructor() {
    this.bindActions(UserProfileActions);
    this.userObject = {};
    this.clicked = false;
  }

  onGetUserSuccess(data) {
    this.userObject = data[0];
    console.log('the store is',this.userObject)
  }

  onGetUserFail(err) {
    console.log('failed to get user info', err);
    return err;
  }

}

export default alt.createStore(UserStore);