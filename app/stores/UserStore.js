import alt from '../alt';
import UserProfileActions from '../actions/UserProfileActions';

class UserStore {
  constructor() {
    this.bindActions(UserProfileActions);
    this.userObject = {};
    this.jeff = 'tj';
  }

  onGetUserSuccess(data) {
    this.userObject = data;
    console.log('I am the userObj ', this.userObject);
  }

  onGetUserFail(err) {
    console.log('failed to get user info', err);
    return err;
  }

}

export default alt.createStore(UserStore);