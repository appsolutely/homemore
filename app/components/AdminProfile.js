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

  render() {
    return (
      <div>
      <div className ="col-sm-6 col-sm-offset-3 text-center">
      <button type='submit' onClick={this.approveAccount.bind(this)}>Approve ME</button>
      <br />
      <br />
      add shelter

       
      </div>
      </div>
    );
  }
}

export default AdminProfile;
