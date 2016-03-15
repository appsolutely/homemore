import alt from '../alt';

class UserProfileActions {
  constructor() {
    this.generateActions(
      'getUserSuccess'
    );
  }

  getUser() {
    $.ajax({ url: '/api/fetchUser/' })
       .done((data) => {
         this.actions.getUserSuccess(data);
       })
       .fail((jqXhr) => {
         this.actions.getUserFail(jqXhr);
       });
  }
}

export default alt.createActions(UserProfileActions);
