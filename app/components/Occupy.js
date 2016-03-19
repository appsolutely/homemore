import React from 'react'

var Occypy = React.createClass({
  getInitialState: function(){
    return {
      items: [],
      task: ''
    }
  },

  deleteTask: function(e) {
    var taskIndex = parseInt(e.target.value, 10);
    console.log('remove task: %d', taskIndex, this.state.items[taskIndex]);
    this.setState(state => {
      state.items.splice(taskIndex, 1);
      return {items: state.items};
    });
  },

  onChange: function(e) {
    this.setState({ task: e.target.value });
  },



  addTask:function (e){
    this.setState({
      items: this.state.items.concat([this.state.task]),

      task: ''
    })

    e.preventDefault();
  },

  render: function(){
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
    });


var List = React.createClass({
    deleteElement:function(){
        console.log("remove");
    },

    render: function(){

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
 });


export default Occypy;
