import React from 'react'

class Occupy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [], task: ''}
    this.onChange = this.onChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(e) {
    var taskIndex = parseInt(e.target.value, 10);
    console.log('remove task: %d', taskIndex, this.state.items[taskIndex]);
    this.setState(state => {
      state.items.splice(taskIndex, 1);
      return {items: state.items};
    });
  }

  onChange(e) {
    this.setState({ task: e.target.value });
  }

  addTask(e){
    e.preventDefault();

      console.log('this.state.items: ', this)
    this.setState({
      items: this.state.items.concat([this.state.task]),
      task: ''
    })
  }

  render(){
    return(
      <div className ="well col-sm-6 col-sm-offset-3 text-left">
        <h2>Edit Shelter Occupancy</h2>

          <form className="text-left" onSubmit={this.addTask}>
            <input onChange={this.onChange} type="text" value={this.state.task} placeholder="type name here"/>
            <button>Add Occupant</button>
            </form>
            <span className="text-left">
            <List items={this.state.items} deleteTask={this.deleteTask} />
            </span>
          </div>
        );
      }
    }


class List extends React.Component {
  deleteElement(){
      console.log("remove");
  }

  render(){

      var displayTask  = function(task, taskIndex){


          return <li>
              {task}
              <button onClick= {this.deleteElement}> Delete </button>
          </li>;
      };

      return <ul>
          {this.props.items.map((task, taskIndex) =>
              <li key={taskIndex}>
                  {task}
                  <button onClick={this.props.deleteTask} value={taskIndex}> Delete </button>
              </li>
          )}
      </ul>;
  }
}

export default Occupy;
