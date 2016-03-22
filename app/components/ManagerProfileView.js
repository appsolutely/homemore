import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class ManagerProfileView extends React.Component {
  constructor(props) {
		super(props);
    this.handleClick = this.handleClick.bind(this);


	}

  handleClick() {
    this.props.clicker(
      this.props.clicked ? false : true
    )
  }

  render(){
    const shelterInfo = this.props.shelterInfo
      console.log(this.props)
    return (
      <div>
        <div>orgName: {shelterInfo.organizationName}</div>
        <div>Shelter Name: {shelterInfo.shelterName}</div>
        <div>Daytime Phone: {shelterInfo.shelterDaytimePhone}</div>
        <div>Emergency Phone: {shelterInfo.shelterEmergencyPhone}</div>
        <div>Email: {shelterInfo.shelterEmail}</div>
        <div>location Information</div>
        <div>Location name: {shelterInfo.locationName}</div>
        <div>Street Address: {shelterInfo.locationStreet}</div>
        <div>City: {shelterInfo.locationCity}</div>
        <div>State: {shelterInfo.locationState}</div>
        <div>Zip: {shelterInfo.locationZip}</div>
        <div>hours</div>
        <div>Monday: {shelterInfo.hoursMonday}</div>
        <div>Tuesday: {shelterInfo.hoursTuesday}</div>
        <div>Wednesday: {shelterInfo.hoursWednesday}</div>
        <div>Thursday: {shelterInfo.hoursThursday}</div>
        <div>Friday: {shelterInfo.hoursFriday}</div>
        <div>Saturday: {shelterInfo.hoursSaturday}</div>
        <div>Sunday: {shelterInfo.hoursSunday}</div>
        <button onClick={this.handleClick}>Edit Me</button>
      </div>
    )
  }
}

export default ManagerProfileView;
