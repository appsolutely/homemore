import React from 'react'
import OccupancyAction from '../actions/OccupancyActions';
import OccupancyStore from '../stores/OccupancyStore';

class Occupy extends React.Component {
  constructor(props) {
    super(props);
    this.state = OccupancyStore.getState();
    this.onChange = this.onChange.bind(this);
    this.addOccupant = this.addOccupant.bind(this);
    this.deleteOccupant = this.deleteOccupant.bind(this);
  }

  componentDidMount(){
    OccupancyStore.listen(this.onChange);
    OccupancyAction.getOccupancy();
  }

  deleteOccupant(e) {
    var taskIndex = parseInt(e.target.value, 10);
    console.log('removed occupant: %d', taskIndex, this.state.items[taskIndex]);
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
    return(
      <div className ="col-sm-6 col-sm-offset-3 text-center">
        <h1 >Add occupants</h1>

          <form onSubmit={this.addOccupant}>
            <input onChange={this.onChange} type="text" value={this.state.task}/>
            <button> Add </button>
            </form>
          </div>
        );
      }
    }

    //<List items={this.state.items} deleteOccupent={this.deleteOccupent} />

// class List extends React.Component {
//   deleteElement(){
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
