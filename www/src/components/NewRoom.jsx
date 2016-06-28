import React from 'react';
import {Link} from 'react-router';
import {Button, Input, message} from 'antd';
import axios from 'axios';
import styles from './NewRoom.less';
import HouseSelector from './HouseSelector'

export default class NewRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      house: '',
      roomNumber: '',
      selectDisabled: false,
      inputDisabled: false
    };
  }

  getHouseName(selected) {
    this.setState({
      house: selected,
      inputDisabled: true
    });
  }

  handleHouseChange(e) {
    this.setState({
      house: e.target.value,
      selectDisabled: true
    });
  }

  handleRoomChange (e) {
    this.setState({
      roomNumber: e.target.value
    });
  }

  submit () {
    axios.post('http://127.0.0.1:5002/api/new-room', {
      house: this.state.house,
      roomNumber: this.state.roomNumber
    })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    message.success('Add Success: '
      + this.state.house + ' '
      + this.state.roomNumber
    );
  }

  leave () {
    return '/accommodation';
  }

  componentDidMount() {

  }

  render() {

    console.log('NewRoom.state:', this.state);
    console.log('NewRoom.props:', this.props);

    return (
      <div>
        <div>
          <HouseSelector disabled={this.state.selectDisabled} getHouseName={this.getHouseName.bind(this)}/>
          <br/>
          <Input placeholder="Or Add a New House" value={this.state.house}
                 onChange={this.handleHouseChange.bind(this)} disabled={this.state.inputDisabled}
                 style={{ width: 200}}/>
        </div><br/>
        <div>
          <Input placeholder="Input a New Room Number" value={this.state.roomNumber}
                 onChange={this.handleRoomChange.bind(this)} style={{ width: 200}}/>
        </div><br/>
        <div>
          <Button type="primary" onClick={this.submit.bind(this)} style={{ width: 100}}>Submit</Button>
          <Button type="ghost" onClick={this.leave.bind(this)} style={{ width: 100}}>
            <Link to={this.leave()}>Leave</Link></Button>
        </div>
      </div>
    );
  }
}
