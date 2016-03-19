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
      <div className ="well col-sm-6 col-sm-offset-3 text-left">
      <button className="btn btn-default" type='submit' onClick={this.approveAccount.bind(this)}>Approve</button>


      <div>
        <span className="row">
          <span className="col-sm-6">
            <h3>Manager Information</h3>
              <div><label>First Name: </label><input ref="firstName" type= "text" placeholder ="first name" /></div>
              <div><label>Last Name: </label><input ref="lastName" type= "text" placeholder ="last name"/></div>
              <div><label>Email: </label><input ref="email" type= "text" placeholder ="email"/></div>
          </span>
        </span>
        <span className="row">
          <span className="col-sm-6">
            <h3>Shelter Information</h3>
            <div><label>Shelter Name:</label><input ref="shelterName" type= "text" placeholder ="shelter name"/></div>
            <div><label>Email:</label><input ref="shelterEmail" type= "text" placeholder ="email"/></div>
            <div><label>Daytime Phone:</label><input ref="shelterDayTimePhone" type= "text" placeholder ="daytime phone"/></div>
            <div><label>911 Phone:</label><input ref="shelterEmergencyPhone" type= "text" placeholder ="emergency phone"/></div>
          </span>
        </span>

        <span className="row">
          <span className="col-sm-6">
            <h4>Location Information</h4>
            <div><label>Location Name</label> <input ref="name" type= "text" placeholder ="name" /></div>
            <div><label>Street:</label> <input ref="street" type= "text" placeholder ="street address"/></div>
            <div><label>City:</label> <input ref="city" type= "text" placeholder ="city"/></div>
            <div><label>State:</label> <input ref="state" type= "text" placeholder ="state" /></div>
            <div><label>Zip:</label> <input ref="zip" type= "text" placeholder ="zip"/></div>
            <div><label>Phone:</label> <input ref="phone" type= "text" placeholder ="phone"/></div>
          </span>
        
 
          <span className="col-sm-6">
            <h4>Hours of Operation</h4>
            <div><label>Monday:</label> <input ref="monday" type= "text" placeholder ="open 24 hours" /></div>
            <div><label>Tuesday:</label> <input ref="tuesday" type= "text" placeholder ="open 24 hours"/></div>
            <div><label>Wednesday:</label> <input ref="wednesday" type= "text" placeholder ="open 24 hours"/></div>
            <div><label>Thursday:</label> <input ref="thursday" type= "text" placeholder ="open 24 hours" /></div>
            <div><label>Friday:</label> <input ref="friday" type= "text" placeholder ="open 24 hours"/></div>
            <div><label>Saturday:</label> <input ref="saturday" type= "text" placeholder ="open 24 hours"/></div>
            <div><label>Sunday:</label> <input ref="sunday" type= "text" placeholder ="open 24 hours"/></div>
          </span>
        </span>

        <button className="btn btn-primary" onClick={this.createShelter.bind(this)}>Create Shelter</button>

      </div>


      </div>
      </div>
    );
  }
}

export default AdminProfile;
