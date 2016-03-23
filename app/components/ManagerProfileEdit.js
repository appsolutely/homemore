import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class ManagerProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    let orgName = this.refs.orgName.value || this.props.shelterInfo.organizationName
    let shelterName = this.refs.shelterName.value || this.props.shelterInfo.shelterName
    let dayPhone = this.refs.dayPhone.value || this.props.shelterInfo.locationPhone
    let emergencyPhone = this.refs.emergencyPhone.value || this.props.shelterInfo.shelterEmergencyPhone
    let email = this.refs.email.value || this.props.shelterInfo.shelterEmail
    let locationName = this.refs.locationName.value || this.props.shelterInfo.locationName
    let streetAddress = this.refs.streetAddress.value || this.props.shelterInfo.locationStreet
    let city = this.refs.city.value || this.props.shelterInfo.locationCity
    let state = this.refs.state.value || this.props.shelterInfo.locationState
    let zip = this.refs.zip.value || this.props.shelterInfo.locationZip
    let monday = this.refs.monday.value || this.props.shelterInfo.hoursMonday
    let tuesday = this.refs.tuesday.value || this.props.shelterInfo.hoursTuesday
    let wednesday = this.refs.wednesday.value || this.props.shelterInfo.hoursWednesday
    let thursday = this.refs.thursday.value || this.props.shelterInfo.hoursThursday
    let friday = this.refs.friday.value || this.props.shelterInfo.hoursFriday
    let saturday = this.refs.saturday.value || this.props.shelterInfo.hoursSaturday
    let sunday = this.refs.sunday.value || this.props.shelterInfo.hoursSunday

    this.props.save(
      orgName,
      shelterName,
      dayPhone,
      emergencyPhone,
      email,
      locationName,
      streetAddress,
      city,
      state,
      zip,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday
    )
    console.log(this.props, "<====new update")
    this.props.clicker(
      this.props.clicked ? true : false
    )
  }

  render(){
    console.log("edit",this.props.shelterInfo)
    return (<div>
            <div>orgName: <input type='text' ref='orgName'/> </div>
            <div>Shelter Name: <input type='text' ref='shelterName'/></div>
            <div>Daytime Phone: <input type='text' ref='dayPhone'/> </div>
            <div>Emergency Phone: <input type='text' ref='emergencyPhone'/> </div>
            <div>Email: <input type='text' ref='email'/></div>
            <div>location Information</div>
            <div>Location name: <input type='text' ref='locationName'/> </div>
            <div>Street Address: <input type='text' ref='streetAddress'/> </div>
            <div>City: <input type='text' ref='city'/> </div>
            <div>State: <input type='text' ref='state'/> </div>
            <div>Zip: <input type='text' ref='zip'/></div>
            <div>hours</div>
            <div>Monday: <input type='text' ref='monday'/></div>
            <div>Tuesday: <input type='text' ref='tuesday'/> </div>
            <div>Wednesday: <input type='text' ref='wednesday'/> </div>
            <div>Thursday: <input type='text' ref='thursday'/> </div>
            <div>Friday: <input type='text' ref='friday'/></div>
            <div>Saturday: <input type='text' ref='saturday'/></div>
            <div>Sunday: <input type='text' ref='sunday'/></div>
            <button onClick={this.handleClick}>submit</button>
          </div>)
  }
}

export default ManagerProfileEdit;
