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
    return (<div className="well text-left edit-shelter">
              <h2>Edit Shelter</h2>
              <div><label>Organization Name:</label> <input type='text' ref='orgName'/> </div>
              <div><label>Shelter Name:</label> <input type='text' ref='shelterName'/></div>
              <div><label>Daytime Phone:</label> <input type='text' ref='dayPhone'/> </div>
              <div><label>Emergency Phone:</label> <input type='text' ref='emergencyPhone'/> </div>
              <div><label>Email:</label> <input type='text' ref='email'/></div>
            <div><h3>Location Information</h3></div>
              <div><label>Location name:</label> <input type='text' ref='locationName'/> </div>
              <div><label>Street Address:</label> <input type='text' ref='streetAddress'/> </div>
              <div><label>City:</label> <input type='text' ref='city'/> </div>
              <div><label>State:</label> <input type='text' ref='state'/> </div>
              <div><label>Zip:</label> <input type='text' ref='zip'/></div>
            <div><h3>Hours of Operation</h3></div>
              <div><label>Monday:</label> <input type='text' ref='monday'/></div>
              <div><label>Tuesday:</label> <input type='text' ref='tuesday'/> </div>
              <div><label>Wednesday:</label> <input type='text' ref='wednesday'/> </div>
              <div><label>Thursday:</label> <input type='text' ref='thursday'/> </div>
              <div><label>Friday:</label> <input type='text' ref='friday'/></div>
              <div><label>Saturday:</label> <input type='text' ref='saturday'/></div>
              <div><label>Sunday:</label> <input type='text' ref='sunday'/></div>
            <div className="text-right">
              <button className="btn btn-primary" onClick={this.handleClick}>Submit</button>
            </div>
          </div>)
  }
}

export default ManagerProfileEdit;
