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

  stateStuff(){
    $.ajax({
      type: 'POST',
      url: '/api/fetchShelterOccupants',
      data:{shelters: {shelterName: 'ARCH Emergency Night Shelter'}},
      success: function(data){
        console.log("getting Occupents for Men Emergency Night Shelter", data)
      },
      fail: function(err){
        console.log('err', err);
      }
    });
  }

  onChange(e) {
    this.setState({ task: e.target.value });
  }

  addTask(e){
    e.preventDefault();
    this.setState({
      items: this.state.items.concat([this.state.task]),
      task: ''
    })
    this.stateStuff()
  }

  render(){
    return(
      <div className ="col-sm-6 col-sm-offset-3 text-center">
        <h1 >Add occupants</h1>

          <form onSubmit={this.addTask}>
            <input onChange={this.onChange} type="text" value={this.state.task}/>
            <button> Add </button>
            </form>
            <List items={this.state.items} deleteTask={this.deleteTask} />
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
