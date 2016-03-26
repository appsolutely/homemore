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
       .fail((err) => {
         this.actions.getUserFail(err);
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
      data: updatedProfileObject,
    })
      .done((data) => {
        this.actions.updateUserSuccess(data);
      })
      .fail((err) => {
        this.actions.updateUserFail(err.responseJSON.message);
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
      .fail((err) => {
        this.actions.addShelterFail(err);
      });
  }
}

export default alt.createActions(UserProfileActions);
