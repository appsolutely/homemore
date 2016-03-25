import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';


const {Input} = FRC;

const OccupantForm = React.createClass({
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


class ShowOccupants extends React.Component{
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

// stuff
  handleAdd(id,name){
    const residentName = this.refs["name" + id].getValue();
    this.props.add(id,residentName);
    // console.log('I should not exist');
  }

  handleRemove(id,name){
    console.log('I am the ID to be removed', id)
    this.props.remove(id,name);
    // $('#'+unit.shelterUnitID).hide()
  }

  handleEdit(){
    
  }

  render(){
  	const occupants = this.props.units.map((unit) => {
      const thisName = unit.occupiedByName || 'Unit Open';
      const adder = (e) => {this.handleAdd(unit.shelterUnitID); };
      const remover = (e) => {this.handleRemove(unit.occupancyID, unit.occupiedByName); };
      return (
        

          
          <tr key={unit.shelterUnitID} className='occupant' id={unit.shelterUnitID}>

                <td>{thisName}</td>
                <td>{unit.unitName ? unit.unitName : "Unknown"}</td>
                <td>{unit.unitSize ? unit.unitSize : "Unknown"}</td>
                <td>{function(){if(thisName === 'Unit Open'){
              return (<OccupantForm onValidSubmit={adder}>
                            <Input
                              ref={"name" + unit.shelterUnitID}
                              name="occupant"
                              value=""
                              type="text"
                              validations={{minLength: 1,
                                            isWords: true}}
                              validationError="Must be a valid name"
                              placeholder="Occupant Name"
                            />
                            <button className="btn btn-primary btn-xs editButton" onValidSubmit={adder}>Add Occupant</button></OccupantForm>)
            }else{
              return <button className="btn btn-primary btn-xs editButton" onClick={remover}>Remove Occupant</button>
            }
          }.call(this)}</td>
            </tr>


   

      );
    })
  	return(
  	
		  <table className="table table-striped">
        <thead>
          <tr>
            <th>Occupant</th>
            <th>Unit Name</th>
            <th>Unit Size</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {occupants}
        </tbody>
      </table>
  			
  		
  	)
  }

}
//  


export default ShowOccupants;