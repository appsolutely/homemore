import React from 'react'
import OccpancyAction from '../actions/OccpancyActions';
import OccupancyStore from '../stores/OccupancyStore';

class Occupy extends React.Component {
  constructor(props) {
    super(props);
    this.state = OccupancyStore.getState();
    this.onChange = this.onChange.bind(this);
    this.addOccupent = this.addOccupent.bind(this);
    this.deleteOccupent = this.deleteOccupent.bind(this);
  }

  componentDidMount(){
    OccupancyStore.listen(this.onChange);
    OccpancyAction.onGetOccupancySuccess();
  }

  deleteOccupent(e) {
    var taskIndex = parseInt(e.target.value, 10);
    console.log('removed occupant: %d', taskIndex, this.state.items[taskIndex]);
    this.setState(state => {
      state.items.splice(taskIndex, 1);
      return {items: state.items};
    });
  }

  onChange(e) {
    console.log('this is state!',this.state)

  }

  addOccupent(e){
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

          <form onSubmit={this.addOccupent}>
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
