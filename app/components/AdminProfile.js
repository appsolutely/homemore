import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import alt from '../alt';
import UserProfileActions from '../actions/UserProfileActions';

class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = alt.stores.UserStore.state;
  }
  componentDidMount() {
    //UserStore.listen(this.onChange);
    UserProfileActions.getUser();
    console.log(this.state.shelters)
  }

  approveAccount(){
    this.post(this.state.userObject.userEmail)
  }

  post(data){
    $.ajax({
      type: 'POST',
      url: '/api/approve',
      data:{permission: 'JCB', user: {email: data}},
      success: function(data){
        console.log("account has been approved")
      },
      fail: function(err){
        console.log('err', err);
      }
    });
  }

  createShelter(){
    console.log("Pew Pew Pew")
  }

  render() {
    return (
      <div>
      <div className ="col-sm-6 col-sm-offset-3 text-center">
      <button type='submit' onClick={this.approveAccount.bind(this)}>Approve ME</button>
      <br />
      <br />
      add shelter

      <div>
        manager info
        <br />
        <input type= "text" placeholder ="firstName"/>
        <input type= "text" placeholder ="lastName"/>
        <br />
        <br />
        <input type= "text" placeholder ="email"/>
        <br />
        <br />
        shelter
        <br />
        <input type= "text" placeholder ="orgName"/>
        <br />
        <br />
        <input type= "text" placeholder ="shelterName"/>
        <br />
        <br />
        <input type= "text" placeholder ="shelterEmail"/>
        <br />
        <br />
        <input type= "text" placeholder ="shelterEmergencyPhone"/>
        <br />
        <br />
        <input type= "text" placeholder ="shelterAddress"/>
        <br />
        <br />
        <input type= "text" placeholder ="shelterDayTimePhone"/>
        <br />
        <br />
        <button onClick={this.createShelter.bind(this)}>PEW PEW PEW</button>
      </div>


      </div>
      </div>
    );
  }
}

export default AdminProfile;
