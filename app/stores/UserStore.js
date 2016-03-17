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
  }

  onGetUserFail(err) {
    console.log('failed to get user info', err);
    return err;
  }
  // since success forces a redraw
  // onUpdateUserSuccess(data) {
  //   this.userObjectProfile = data.user;
  //   console.log('successfully updated info', data);
  // }

  onUpdateUserFail(err){
    console.log('update failed because:', err)
  }

}

export default alt.createStore(UserStore);
