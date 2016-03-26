import alt from '../alt';

class HeaderActions {
  constructor() {
    this.generateActions(
		'postSignInSuccess',
		'postSignInFail'
	);
  }

  postSignIn(email, password) {
    const signinObject = { user: { password: password, email: email } };
    $.ajax({
      type: 'POST',
      url: '/api/signin',
      data: signinObject,
    })
    .done((data) => {
      this.actions.postSignInSuccess(data);
    })
    .fail((err) => {
      this.actions.postSignInFail(err.responseJSON.error);
    });
  }
}

export default alt.createActions(HeaderActions);