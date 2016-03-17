import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import alt from '../alt';
import UserProfileActions from '../actions/UserProfileActions';

class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = alt.stores.UserStore.state;
    this.formData = {headers: {}, managerUser: {firstName: '', lastName: '', email: ''},
      organizations: {orgName: ''},
      shelters:{shelterName: '', shelterEmail: '', shelterEmergencyPhone: '', shelterAddress: '', shelterDayTimePhone: ''},
      locations:{name: '', street: '', city: '', state: '', zip: '', phone: ''},
      hours: {monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: ''}
    }
  }
  componentDidMount() {
    //UserStore.listen(this.onChange);
    UserProfileActions.getUser();
  }

  approveAccount(){
    this.post(this.state.userObject.user.userEmail)
    console.log(this.state.userObject.shelters[0].organizationName)
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

  postShelter(data){
    $.ajax({
      type: 'POST',
      url: '/api/createManager',
      data: data,
      success: function(data){
        console.log("shelter/manager added", this.state)
      },
      fail: function(err){
        console.log('err', err);
      }
    });
  }

  createShelter(){
    //managerUser Data
    this.formData.managerUser.firstName = this.refs.firstName.value
    this.formData.managerUser.lastName = this.refs.lastName.value
    this.formData.managerUser.email = this.refs.email.value
    //organizations Data
    this.formData.organizations.orgName = this.state.userObject.shelters[0].organizationName
    //shelter Data
    this.formData.shelters.shelterName = this.refs.shelterName.value
    this.formData.shelters.shelterEmail = this.refs.shelterEmail.value
    this.formData.shelters.shelterEmergencyPhone = this.refs.shelterEmergencyPhone.value
    this.formData.shelters.shelterAddress = this.refs.shelterAddress.value
    this.formData.shelters.shelterDayTimePhone = this.refs.shelterDayTimePhone.value
    //location data
    this.formData.locations.name = this.refs.name.value
    this.formData.locations.street = this.refs.street.value
    this.formData.locations.city = this.refs.city.value
    this.formData.locations.state = this.refs.state.value
    this.formData.locations.zip = this.refs.zip.value
    this.formData.locations.phone = this.refs.phone.value
    //hours Data
    this.formData.hours.monday = this.refs.monday.value
    this.formData.hours.tuesday = this.refs.tuesday.value
    this.formData.hours.wednesday = this.refs.wednesday.value
    this.formData.hours.thursday = this.refs.thursday.value
    this.formData.hours.friday = this.refs.friday.value
    this.formData.hours.saturday = this.refs.saturday.value
    this.formData.hours.sunday = this.refs.sunday.value
    this.postShelter(this.formData)
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
        <input ref="firstName" type= "text" placeholder ="firstName" />
        <input ref="lastName" type= "text" placeholder ="lastName"/>
        <input ref="email" type= "text" placeholder ="email"/>
        <br />
        <br />
        shelter
        <br />
        <input ref="shelterName" type= "text" placeholder ="shelterName"/>
        <input ref="shelterEmail" type= "text" placeholder ="shelterEmail"/>
        <input ref="shelterEmergencyPhone" type= "text" placeholder ="shelterEmergencyPhone"/>
        <input ref="shelterAddress" type= "text" placeholder ="shelterAddress"/>
        <input ref="shelterDayTimePhone" type= "text" placeholder ="shelterDayTimePhone"/>
        <br />
        <br />
        location
        <br />
        <input ref="name" type= "text" placeholder ="name" />
        <input ref="street" type= "text" placeholder ="street"/>
        <input ref="city" type= "text" placeholder ="city"/>
        <input ref="state" type= "text" placeholder ="state" />
        <input ref="zip" type= "text" placeholder ="zip"/>
        <input ref="phone" type= "text" placeholder ="phone"/>
        <br />
        <br />
        hours
        <br />
        <input ref="monday" type= "text" placeholder ="monday" />
        <input ref="tuesday" type= "text" placeholder ="tuesday"/>
        <input ref="wednesday" type= "text" placeholder ="wednesday"/>
        <input ref="thursday" type= "text" placeholder ="thursday" />
        <input ref="friday" type= "text" placeholder ="friday"/>
        <input ref="saturday" type= "text" placeholder ="saturday"/>
        <input ref="sunday" type= "text" placeholder ="sunday"/>
        <br />
        <br />
        <button onClick={this.createShelter.bind(this)}>PEW PEW PEW</button>
        <br />
        <br />
      </div>


      </div>
      </div>
    );
  }
}

export default AdminProfile;
