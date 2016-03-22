import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class ManagerProfileEdit extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clicker(
      this.props.clicked ? true : false
    )
  }

  render(){
    return (<div>
            <div>orgName: <input type='text'/> </div>
            <div>Shelter Name: <input type='text'/></div>
            <div>Daytime Phone: <input type='text'/> </div>
            <div>Emergency Phone: <input type='text'/> </div>
            <div>Email: <input type='text'/></div>
            <div>location Information</div>
            <div>Location name: <input type='text'/> </div>
            <div>Street Address: <input type='text'/> </div>
            <div>City: <input type='text'/> </div>
            <div>State: <input type='text'/> </div>
            <div>Zip: <input type='text'/></div>
            <div>hours</div>
            <div>Monday: <input type='text'/></div>
            <div>Tuesday: <input type='text'/> </div>
            <div>Wednesday: <input type='text'/> </div>
            <div>Thursday: <input type='text'/> </div>
            <div>Friday: <input type='text'/></div>
            <div>Saturday: <input type='text'/></div>
            <div>Sunday: <input type='text'/></div>
            <button onClick={this.handleClick}>submit</button>
          </div>)
  }
}

export default ManagerProfileEdit;
