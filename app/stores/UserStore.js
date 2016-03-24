import alt from '../alt';
import UserProfileActions from '../actions/UserProfileActions';

class UserStore {
  constructor() {
    this.bindActions(UserProfileActions);
    this.userObject = {};
    this.userObjectProfile = {};
    this.clicked = false;
    this.passwordValidationState = '';
    this.emailValidationState = '';
    this.nameValidationState = '';
    this.phoneValidationState = '';
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

  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter a valid name.';
  }

  onInvalidEmail() {
    this.emailValidationState = 'has-error';
    this.helpBlock = 'Please enter a valid email.';
  }

  onInvalidPhone() {
    this.phoneValidationState = 'has-error';
    this.helpBlock = 'Please enter a valid phone number.';
  }

}

export default alt.createStore(UserStore);
