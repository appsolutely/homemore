import alt from '../alt';
import UserProfileActions from '../actions/UserProfileActions';

class UserStore {
  constructor() {
    this.bindActions(UserProfileActions);
    this.userObject = {};
    this.userObjectProfile = {};
    this.clicked = false;
  }

  onGetUserSuccess(data) {
    this.userObject = data;
    this.userObjectProfile = data.user;
    console.log('the response is', data)
    console.log('without an object', this.userObjectProfile)
  }

  onGetUserFail(err) {
    console.log('failed to get user info', err);
    return err;
  }

}

export default alt.createStore(UserStore);
