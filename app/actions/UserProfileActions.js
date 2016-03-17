import alt from '../alt';

class UserProfileActions {
  constructor() {
    this.generateActions(
      'getUserSuccess',
      'getUserFail',
      'updateUserSuccess',
      'updateUserFail'
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

  updateUser(firstName, lastName, email, password, phone, passwordFlag, emailFlag) {
    var updatedProfileObject = {'user' : 
      {
      'firstName' : firstName,
      'lastName' : lastName,
      'email' : email,
      'phone' : phone,
      'password': password
      },
      'passwordChanged' : passwordFlag,
      'emailChanged' : emailFlag
    };


    console.log('being sent to the server: ', updatedProfileObject)
    $.ajax({ 
      type: 'POST',
      url: '/api/updateUser',
      data: updatedProfileObject
    })
      .done((data) => {
        this.actions.updateUserSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.updateUserFail(jqXhr.responseJSON.message);
      })
  }
}

export default alt.createActions(UserProfileActions);
