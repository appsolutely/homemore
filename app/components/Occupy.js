import React from 'react'
import OccupancyAction from '../actions/OccupancyActions';
import OccupancyStore from '../stores/OccupancyStore';

class Occupy extends React.Component {
  constructor(props) {
    super(props);
    this.state = OccupancyStore.getState();
    this.onChange = this.onChange.bind(this);
    this.addOccupant = this.addOccupant.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount(){
    OccupancyStore.listen(this.onChange);
    OccupancyAction.getOccupancy();
  }

  remove(id) {
    //e.preventDefault();
    //var taskIndex = parseInt(e.target.value, 10);
    console.log('removed occupant: %d', id);
    this.setState(state => {
      state.items.splice(taskIndex, 1);
      return {items: state.items};
    });
  }

  onChange(state) {
    this.setState(state);
  }

  addOccupant(e){
    e.preventDefault();
    // this.setState({
    //   items: this.state.items.concat([this.state.task]),
    //   task: ''
    // })
    // this.stateStuff()
  }
  render(){
    const occupants = this.state.occupancyObject.map((person) => {
      const bound = this.remove.bind(this, person.occupancyID)
      return (
        <div key={person.occupancyID} className='occupant'>
          <h3>{person.occupiedByName}</h3>
          <h4>Entrance Date: {person.entranceDate}</h4>
          <h4>Exit Date: {person.exitDate}</h4>
          <button className="btn btn-primary editButton" onClick={bound}>Remove</button>
        </div>
      );
    })
    return (
      <div className ="col-sm-6 col-sm-offset-3 text-center">
        <h1 >Add occupants</h1>
          <form onSubmit={this.addOccupant}>
            <input onChange={this.onChange} type="text" value={this.state.task}/>
          </form>
          <h2>Current Occupants</h2>
          {occupants}
      </div>
    );
  }
}



//       console.log("remove");
//   }
//
//   render(){
//
//       var displayTask  = function(task, taskIndex){
//
//
//           return <li>
//               {task}
//               <button onClick= {this.deleteElement}> Delete </button>
//           </li>;
//       };
//
//       return <ul>
//           {this.props.items.map((task, taskIndex) =>
//               <li key={taskIndex}>
//                   {task}
//                   <button onClick={this.props.deleteOccupent} value={taskIndex}> Delete </button>
//               </li>
//           )}
//       </ul>;
//   }
// }

export default Occupy;
