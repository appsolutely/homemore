import React from 'react';
import ReactDOM from 'react-dom';
import alt from '../alt';
import UserProfileActions from '../actions/UserProfileActions';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';


const {Input} = FRC;

const NewShelterForm = React.createClass({

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

class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
    this.createShelter = this.createShelter.bind(this)
    this.state = alt.stores.UserStore.state;
    this.postShelter = this.postShelter.bind(this);
    this.formData = {headers: {}, managerUser: {firstName: '', lastName: '', email: ''},
      organizations: {orgName: ''},
      shelters:{shelterName: '', shelterEmail: '', shelterEmergencyPhone: '', shelterAddress: '', shelterDayTimePhone: ''},
      locations:{name: '', street: '', city: '', state: '', zip: '', phone: ''},
      hours: {monday: 'Open 24 Hours', tuesday: 'Open 24 Hours', wednesday: 'Open 24 Hours', thursday: 'Open 24 Hours', friday: 'Open 24 Hours', saturday: 'Open 24 Hours', sunday: 'Open 24 Hours'}
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
        //this.state.help = 'Shelter Submitted!'      
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
        console.log("shelter/manager added", data);
      },
      fail: function(err){
        console.log('err', err);
        this.setState({
          help: 'Something went wrong'
        })
      }
    });
  }

  createShelter() {
    //managerUser Data
    this.formData.managerUser.firstName = this.refs.firstName.getValue()
    this.formData.managerUser.lastName = this.refs.lastName.getValue()
    this.formData.managerUser.email = this.refs.email.getValue()
    //organizations Data
    this.formData.organizations.orgName = this.state.userObject.shelters[0].organizationName
    //shelter Data
    this.formData.shelters.shelterName = this.refs.shelterName.getValue()
    this.formData.shelters.shelterEmail = this.refs.shelterEmail.getValue()
    this.formData.shelters.shelterEmergencyPhone = this.refs.shelterEmergencyPhone.getValue()
    this.formData.shelters.shelterDayTimePhone = this.refs.shelterDayTimePhone.getValue()
    //location data
    this.formData.locations.name = this.refs.name.getValue()
    this.formData.locations.street = this.refs.street.getValue()
    this.formData.locations.city = this.refs.city.getValue()
    this.formData.locations.state = this.refs.state.getValue()
    this.formData.locations.zip = this.refs.zip.getValue()
    this.formData.locations.phone = this.refs.phone.getValue()
    //hours Data
    this.formData.hours.monday = this.refs.monday.getValue()
    this.formData.hours.tuesday = this.refs.tuesday.getValue()
    this.formData.hours.wednesday = this.refs.wednesday.getValue()
    this.formData.hours.thursday = this.refs.thursday.getValue()
    this.formData.hours.friday = this.refs.friday.getValue()
    this.formData.hours.saturday = this.refs.saturday.getValue()
    this.formData.hours.sunday = this.refs.sunday.getValue()

    UserProfileActions.addShelter(this.formData)
  }

  render() {
    return (
      <div>
      <div className ="well col-sm-6 col-sm-offset-3 text-left">
      <button className="btn btn-default" type='submit' onClick={this.approveAccount.bind(this)}>Approve</button>


      <NewShelterForm
        onValidSubmit={this.createShelter}
        className="text-left"
      >
        <span className="row">
          <span className="col-sm-7">
            <h3>Manager Information</h3>
          <Input
            onUpdate={this.update}
            ref="firstName"
            name="firstName"
            value=""
            label="First"
            type="text"
            placeholder="First Name"
            required
          />
          <Input
            onUpdate={this.update}
            ref="lastName"
            name="lastName"
            value=""
            label="Last"
            type="text"
            placeholder="Last Name"
            required
          />            
          <Input
            ref="email"
            onUpdate={this.update}
            name="email"
            value=""
            label="Email"
            type="email"
            placeholder="Email"
            validations="isEmail"
            validationErrors={{
                isEmail: 'This doesn’t look like a valid email address.'
            }}
            required
          />
          </span>

          <span className="col-sm-7">
            <h3>Shelter Information</h3>
            <Input
            onUpdate={this.update}
            ref="shelterName"
            name="shelterName"
            value=""
            label="Shelter Name"
            type="text"
            placeholder="Shelter Name"
            required
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
            required
          />
          <Input
            onUpdate={this.update}
            ref="shelterDayTimePhone"
            name="phone"
            value=""
            label="Daytime Phone"
            validations={{isLength: 10,
                          isNumeric: true}}
            validationError="Must be a valid phone number"
            type="text"
            placeholder="Shelter Daytime Phone Number"
            required
          />
          <Input
            onUpdate={this.update}
            ref="shelterEmergencyPhone"
            name="phone"
            value=""
            label="Emergency Phone"
            validations={{isLength: 10,
                          isNumeric: true}}
            validationError="Must be a valid phone number"
            type="text"
            placeholder="Shelter Emergency Phone Number"
            required
          /> 
          </span>
        </span>

        <span className="row">
          <span className="col-sm-7">
            <h4>Location Information</h4>
            <Input
            onUpdate={this.update}
            ref="name"
            name="locationName"
            value=""
            label="Name"
            type="text"
            placeholder="Location Name"
            required
          />
           <Input
            onUpdate={this.update}
            ref="street"
            name="street"
            value=""
            label="Street"
            type="text"
            placeholder="Street"
            required
          />
          <Input
            onUpdate={this.update}
            ref="city"
            name="city"
            value=""
            label="City"
            type="text"
            placeholder="City"
            required
          />
          <Input
            onUpdate={this.update}
            ref="state"
            name="state"
            value=""
            label="State"
            type="text"
            validations={ { isLength: 2,
                          isAlpha: true } }
            validationError="Must be a valid State Postal Code"
            placeholder="State"
            required
          />
          <Input
            onUpdate={this.update}
            ref="zip"
            name="zip"
            value=""
            label="Zip"
            type="text"
            validations={ { isLength: 5,
                            isNumeric: true } }
            validationError="Must be a valid Zip Code"
            placeholder="Zip"
            required
          />
          <Input
            onUpdate={this.update}
            ref="phone"
            name="phone"
            value=""
            label="Phone"
            validations={ { isLength: 10,
                            isNumeric: true } }
            validationError="Must be a valid phone number"
            type="text"
            placeholder="Phone Number"
            required
          />  
          </span>
        
 
          <span className="col-sm-7">
            <h4>Hours of Operation</h4>
            <Input
            onUpdate={this.update}
            ref="monday"
            name="monday"
            value=""
            label="Mon"
            type="text"
            placeholder="ie. open 24 hours"
            required
          />
          <Input
            onUpdate={this.update}
            ref="tuesday"
            name="tuesday"
            value=""
            label="Tue"
            type="text"
            placeholder="ie. open 24 hours"
            required
          />
          <Input
            onUpdate={this.update}
            ref="wednesday"
            name="wednesday"
            value=""
            label="Wed"
            type="text"
            placeholder="ie. open 24 hours"
            required
          />
          <Input
            onUpdate={this.update}
            ref="thursday"
            name="thursday"
            value=""
            label="Thu"
            type="text"
            placeholder="ie. open 24 hours"
            required
          />
          <Input
            onUpdate={this.update}
            ref="friday"
            name="friday"
            value=""
            label="Fri"
            type="text"
            placeholder="ie. open 24 hours"
            required
          />
          <Input
            onUpdate={this.update}
            ref="saturday"
            name="saturday"
            value=""
            label="Sat"
            type="text"
            placeholder="ie. open 24 hours"
            required
          />
          <Input
            onUpdate={this.update}
            ref="sunday"
            name="sunday"
            value=""
            label="Sun"
            type="text"
            placeholder="ie. open 24 hours"
            required
          />
          </span>
        </span>

        <button className="btn btn-primary" onValidSubmit={this.createShelter}>Create Shelter</button>
        <span className='help'>{this.state.help}</span>
      </NewShelterForm>


      </div>
      </div>
    );
  }
}

export default AdminProfile;
