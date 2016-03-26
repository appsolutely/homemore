import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';


const { Input } = FRC;

// no support for mixins w/es6 react
const OccupantForm = React.createClass({
    mixins: [FRC.ParentContextMixin],

    render() {
        return (
            <Formsy.Form
                className="form-elementOnly"
                {...this.props}
                ref="formsy"
            >
                {this.props.children}
            </Formsy.Form>
        );
    }
});

// lists all occupants of current shelter, including empty units
// also contains occupant/unit management tools to allow user to add units && add/remove occupants
class ShowOccupants extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

// stuff
  handleAdd(id, unitName, unitSize) {
    console.log('receiving unitName', unitName);
    const residentName = this.refs['name' + id].getValue();
    this.props.add(id, residentName, unitName, unitSize);
    // console.log('I should not exist');
  }

  handleRemove(id, name) {
    this.props.remove(id, name);
    // $('#'+unit.shelterUnitID).hide()
  }


  render() {
    const occupants = this.props.units.map((unit) => {
      console.log('each unit is: ', unit);
      const thisName = unit.occupiedByName || 'Unit Open';
      const adder = () => {this.handleAdd(unit.shelterUnitID, unit.unitName, unit.unitSize); };
      const remover = () => {this.handleRemove(unit.occupancyID, unit.occupiedByName, unit.unitName, unit.unitSize); };
      return (
          <tr key={unit.shelterUnitID} className="occupant" id={unit.shelterUnitID}>

                <td>{thisName}</td>
                <td>{unit.unitName ? unit.unitName : 'Unknown'}</td>
                <td>{unit.unitSize ? unit.unitSize : 'Unknown'}</td>
                <td>{function () {
                      if (thisName === 'Unit Open') {
                        return (<OccupantForm className="form-elementOnly" onValidSubmit={adder}>
                                <Input
                                  ref={'name' + unit.shelterUnitID}
                                  name="occupant"
                                  value=""
                                  type="text"
                                  validations={{ minLength: 1,
                                                isWords: true }}
                                  validationError="Must be a valid name"
                                  placeholder="Occupant Name"
                                  buttonAfter={<button className="btn btn-primary editButton" onValidSubmit={adder}>Add Occupant</button>}
                                />
                                </OccupantForm>);
                      } else {
                        return <button className="btn btn-primary remove-occupant editButton" onClick={remover}>Remove Occupant</button>;
                      }
                    }.call(this)}</td>
        </tr>
      );
    });
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Occupant</th>
            <th>Unit Name</th>
            <th>Unit Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {occupants}
        </tbody>
      </table>	
    );
  }
}

ShowOccupants.propTypes = {
  add: React.PropTypes.func,
  remove: React.PropTypes.func,
};


export default ShowOccupants;