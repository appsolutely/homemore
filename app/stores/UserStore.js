import alt from '../alt';
import UserProfileActions from '../actions/UserProfileActions';

class UserStore {
  constructor() {
    this.bindActions(UserProfileActions);
    this.userObject = {};
    this.clicked = false;
  }

  onGetUserSuccess(data) {
    this.userObject = data.user;
    console.log('the store is',data.user)
    console.log('the userObject is',this.userObject)
  }

  onGetUserFail(err) {
    console.log('failed to get user info', err);
    return err;
  }

}

export default alt.createStore(UserStore);