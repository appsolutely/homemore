import React from 'react';
import { Link } from 'react-router';
import alt from '../../alt';

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
    return (
      <div className="well text-left">
        <h2>Manage {this.props.shelterInfo.shelterName}</h2>
          <div><h3>Basic Infomation</h3></div>
          <div>Organization Name: {this.props.shelterInfo.organizationName}</div>
          <div>Shelter Name: {this.props.shelterInfo.shelterName}</div>
          <div>Daytime Phone: {this.props.shelterInfo.shelterDaytimePhone}</div>
          <div>Emergency Phone: {this.props.shelterInfo.shelterEmergencyPhone}</div>
          <div>Email: {this.props.shelterInfo.shelterEmail}</div>
        <div><h3>Location Details</h3></div>
          <div>Location name: {this.props.shelterInfo.locationName}</div>
          <div>Street Address: {this.props.shelterInfo.locationStreet}</div>
          <div>City: {this.props.shelterInfo.locationCity}</div>
          <div>State: {this.props.shelterInfo.locationState}</div>
          <div>Zip: {this.props.shelterInfo.locationZip}</div>
        <div><h3>Hours of Operation</h3></div>
          <div>Monday: {this.props.shelterInfo.hoursMonday}</div>
          <div>Tuesday: {this.props.shelterInfo.hoursTuesday}</div>
          <div>Wednesday: {this.props.shelterInfo.hoursWednesday}</div>
          <div>Thursday: {this.props.shelterInfo.hoursThursday}</div>
          <div>Friday: {this.props.shelterInfo.hoursFriday}</div>
          <div>Saturday: {this.props.shelterInfo.hoursSaturday}</div>
          <div>Sunday: {this.props.shelterInfo.hoursSunday}</div>
          <div className="text-right">
            <button className="btn btn-primary" onClick={this.handleClick}>Edit Me</button>
          </div>
      </div>
    )
  }
}

export default ManagerProfileView;
