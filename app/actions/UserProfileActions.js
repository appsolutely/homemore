import alt from '../alt';

class UserProfileActions {
  constructor() {
    this.generateActions(
      'getUserSuccess',
      'getUserFail',
      'updateUserSuccess',
      'updateUserFail',
      'addShelterSuccess',
      'addShelterFail'
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
    var updatedProfileObject = { 'user' : 
      {
       firstName : firstName,
       lastName : lastName,
       email : email,
       phone : phone,
       password: password,
      },
       passwordChanged : passwordFlag,
       emailChanged : emailFlag,
    };

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


  addShelter(shelterObject) {
      $.ajax({
        type: 'POST',
        url: '/api/createManager',
        data: shelterObject,
      })
      .done((data) => {
        this.actions.addShelterSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.addShelterFail(jqXhr);
      });
  }
}

export default alt.createActions(UserProfileActions);
