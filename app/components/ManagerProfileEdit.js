import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';


const {Input} = FRC;

const UpdateShelterForm = React.createClass({

    mixins: [FRC.ParentContextMixin],
    render() {
        return (
            <Formsy.Form
                {...this.props}
                ref="formsy"
            >
                {this.props.children}
            </Formsy.Form>
        );
    }
});


class ManagerProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
   
    let orgName = this.props.shelterInfo.organizationName
    let shelterName = this.refs.shelterName.getValue() || this.props.shelterInfo.shelterName
    let dayPhone = this.refs.shelterDayTimePhone.getValue() || this.props.shelterInfo.locationPhone
    let emergencyPhone = this.refs.shelterEmergencyPhone.getValue() || this.props.shelterInfo.shelterEmergencyPhone
    let email = this.refs.shelterEmail.getValue() || this.props.shelterInfo.shelterEmail
    let locationName = this.refs.name.getValue() || this.props.shelterInfo.locationName
    let streetAddress = this.refs.street.getValue() || this.props.shelterInfo.locationStreet
    let city = this.refs.city.getValue() || this.props.shelterInfo.locationCity
    let state = this.refs.state.getValue() || this.props.shelterInfo.locationState
    let zip = this.refs.zip.getValue() || this.props.shelterInfo.locationZip
    let monday = this.refs.monday.getValue() || this.props.shelterInfo.hoursMonday
    let tuesday = this.refs.tuesday.getValue() || this.props.shelterInfo.hoursTuesday
    let wednesday = this.refs.wednesday.getValue() || this.props.shelterInfo.hoursWednesday
    let thursday = this.refs.thursday.getValue() || this.props.shelterInfo.hoursThursday
    let friday = this.refs.friday.getValue() || this.props.shelterInfo.hoursFriday
    let saturday = this.refs.saturday.getValue() || this.props.shelterInfo.hoursSaturday
    let sunday = this.refs.sunday.getValue() || this.props.shelterInfo.hoursSunday

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
            <UpdateShelterForm
              onValidSubmit={this.handleClick}
              className="text-left"
            >
        <span className="row">
          <span className="col-sm-6">
            <h3>Shelter Information</h3>
            <Input
            onUpdate={this.update}
            ref="shelterName"
            name="shelterName"
            value=""
            label="Shelter Name"
            type="text"
            placeholder="Shelter Name"
          />
            <Input
            ref="shelterEmail"
            onUpdate={this.update}
            name="email"
            value=""
            label="Shelter Email"
            type="email"
            placeholder="Shelter Email"
            validations="isEmail"
            validationErrors={{
                isEmail: 'This doesn’t look like a valid email address.'
            }}
          />
          <Input
            onUpdate={this.update}
            ref="shelterDayTimePhone"
            name="phone"
            value=""
            label="DayTime Phone Number"
            validations={{isLength: 10,
                          isNumeric: true}}
            validationError="Must be a valid phone number"
            type="text"
            placeholder="Shelter Daytime Phone Number"
          />
          <Input
            onUpdate={this.update}
            ref="shelterEmergencyPhone"
            name="phone"
            value=""
            label="Emergency Phone Number"
            validations={{isLength: 10,
                          isNumeric: true}}
            validationError="Must be a valid phone number"
            type="text"
            placeholder="Shelter Emergency Phone Number"
          /> 
          </span>
        </span>

        <span className="row">
          <span className="col-sm-6">
            <h4>Location Information</h4>
            <Input
            onUpdate={this.update}
            ref="name"
            name="locationName"
            value=""
            label="Location Name"
            type="text"
            placeholder="Location Name"
          />
           <Input
            onUpdate={this.update}
            ref="street"
            name="street"
            value=""
            label="Street"
            type="text"
            placeholder="Street Address"
          />
          <Input
            onUpdate={this.update}
            ref="city"
            name="city"
            value=""
            label="City"
            type="text"
            placeholder="City"
          />
          <Input
            onUpdate={this.update}
            ref="state"
            name="state"
            value=""
            label="State"
            type="text"
            validations={{isLength: 2,
                          isAlpha: true}}
            validationError="Must be a valid State Postal Code"
            placeholder="State"
          />
          <Input
            onUpdate={this.update}
            ref="zip"
            name="zip"
            value=""
            label="Zip Code"
            type="text"
            validations={{isLength: 5,
                          isNumeric: true}}
            validationError="Must be a valid Zip Code"
            placeholder="Zip"
          />
          <Input
            onUpdate={this.update}
            ref="phone"
            name="phone"
            value=""
            label="Phone Number"
            validations={{isLength: 10,
                          isNumeric: true}}
            validationError="Must be a valid phone number"
            type="text"
            placeholder="Phone Number"
          />  
          </span>
          <span className="col-sm-6">
            <h4>Hours of Operation</h4>
            <Input
            onUpdate={this.update}
            ref="monday"
            name="monday"
            value=""
            label="Monday"
            type="text"
            placeholder="Monday"
          />
          <Input
            onUpdate={this.update}
            ref="tuesday"
            name="tuesday"
            value=""
            label="Tuesday"
            type="text"
            placeholder="Tuesday"
          />
          <Input
            onUpdate={this.update}
            ref="wednesday"
            name="wednesday"
            value=""
            label="Wednesday"
            type="text"
            placeholder="Wednesday"
          />
          <Input
            onUpdate={this.update}
            ref="thursday"
            name="thursday"
            value=""
            label="Thursday"
            type="text"
            placeholder="Thursday"
          />
          <Input
            onUpdate={this.update}
            ref="friday"
            name="friday"
            value=""
            label="Friday"
            type="text"
            placeholder="Friday"
          />
          <Input
            onUpdate={this.update}
            ref="saturday"
            name="saturday"
            value=""
            label="Saturday"
            type="text"
            placeholder="Saturday"
          />
          <Input
            onUpdate={this.update}
            ref="sunday"
            name="sunday"
            value=""
            label="Sunday"
            type="text"
            placeholder="Sunday"
          />
          </span>
        </span>
            <div className="text-right">
              <button className="btn btn-primary" onValidSubmit={this.handleClick}>Submit</button>
            </div>
        </UpdateShelterForm>
          </div>)
  }
}

export default ManagerProfileEdit;
