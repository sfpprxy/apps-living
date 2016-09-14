import React from 'react';
import {Link} from 'react-router';
import {Button, Input, message} from 'antd';
import axios from 'axios';
import styles from './EditRoom.less';
import HouseSelector from './HouseSelector'
import RoomSelector from './RoomSelector'
import Helper from './Helper'

export default class NewParcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      house: '',
      room: '',
      name: '',
      email: '',
      roomId: null
    };
  }

  getHouseName(selected) {
    this.setState({
      house: selected,
      resetRoomSelector: true
    });
  }

  getRoomNumber(selected) {
    this.setState({
      room: selected
    });
  }

  getRoomId(roomId) {
    this.setState({
      roomId: roomId,
      resetRoomSelector: false
    });
    axios.get(Helper.getURL() + '/api/room/' + roomId, {})
      .then(jsonData => {
        this.setState({
          name: jsonData.data.room[0].tenantName,
          email: jsonData.data.room[0].email
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addParcel() {
    axios.post(Helper.getURL() + '/api/new-parcel', {
      roomId: this.state.roomId
    })
      .then(response => {
        console.log(response.data);
        if (response.data === 'Wrong email address format') {
          message.error('Wrong email address format, please check and update', 5);
        } else {
          message.success('Send Success');
          this.fetchTableData('current');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  leave() {
    return '/parcel';
  }

  componentDidMount() {

  }

  render() {

    console.log('EditRoom.state:', this.state);
    console.log('EditRoom.props:', this.props);

    return (
      <div className={styles.content}>
        <div>
          <HouseSelector getHouseName={this.getHouseName.bind(this)}/>
        </div>
        <br/>
        <div>
          <RoomSelector reset={this.state.resetRoomSelector} house={this.state.house}
                        getRoomNumber={this.getRoomNumber.bind(this)}
                        getRoomId={this.getRoomId.bind(this)}/>
        </div>
        <br/>
        <div>
          <Button type="primary" onClick={this.addParcel.bind(this)} style={{ width: 100}}>Add Parcel</Button>
          <Button type="ghost" onClick={this.leave.bind(this)} style={{ width: 100}}>
            <Link to={this.leave()}>Leave</Link></Button>
        </div>

      </div>
    );
  }
}
