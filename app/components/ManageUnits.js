import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';


const {Input, Select} = FRC;

const NewUnitForm = React.createClass({
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

class ManageUnits extends React.Component {
  constructor(props) {
    super(props);
    this.addUnits = this.addUnits.bind(this);
  }

// stuff
  
  addUnits(e){
    console.log('adding a unit without click')
    const theShelter = this.props.shelter;
    console.log(theShelter);
    //clean up everything that isn't a number
    const beds = this.refs.beds.getValue()
    const theBeds = beds.split('').filter((num) => parseInt(num));
    theBeds.push('BD');
    const unit = {shelterUnit: {unitSize: theBeds.join(''), unitName: this.refs.unitName.getValue()}, 
    shelters: {shelterName: theShelter.shelterName}, 
    organizations: {orgName: theShelter.organizationName}};
    this.props.add(unit);
    //ManagerActions.addUnits(unit);
  }

  removeUnits(e){
    // e.preventDefault();
    //need to pass it shelterUnitID
    ManagerActions.removeUnits();
  }


  render(){
    const bedSelect = [
            {value: '', label: '--Select--'},
            {value: '1', label: '1BD'},
            {value: '2', label: '2BD'},
            {value: '3', label: '3BD'}
        ];


    return (
      <div className="well">
        <NewUnitForm 
        onValidSubmit={this.addUnits}
        className="form-inline"
        >
        <span><h3>Add Units</h3></span>
          <span className="selectUnits">
              <Input
                ref="unitName"
                name="unitName"
                value=""
                label="Unit Name"
                type="text"
                validations="isExisty"
                validationError="Must have value"
                placeholder="Unit Name..."
                required
              />
            <Select
              ref="beds"
              name="beds"
              label="Beds per unit"
              options={bedSelect}
              required
            />
          </span>
          <button className="btn btn-primary editButton" onValidSubmit={this.addUnits}>Add Unit</button>
        </NewUnitForm>
      </div>
    );
  }
}



export default ManageUnits;
