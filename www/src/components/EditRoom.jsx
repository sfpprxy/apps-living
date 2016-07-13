import React from 'react';
import {Link} from 'react-router';
import {Button, Input, message} from 'antd';
import axios from 'axios';
import styles from './EditRoom.less';
import HouseSelector from './HouseSelector'
import RoomSelector from './RoomSelector'
import Helper from './Helper'

export default class EditRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      house: '',
      room: '',
      name: '',
      email: ''
    };
  }

  getHouseName(selected) {
    this.setState({
      house: selected,
      resetRoomSelector: true
    });
  }

  getRoomNumber (selected) {
    this.setState({
      room: selected
    });
  }

  getRoomId (roomId) {
    this.setState({
      roomId: roomId,
      resetRoomSelector: false
    });
    axios.get(Helper.getURL() + '/api/room/' + roomId, {
    })
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

  handleTenantChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleEmailChange (e) {
    this.setState({
      email: e.target.value
    });
  }

  submit () {
    axios.post(Helper.getURL() + '/api/update-tenant', {
      tenantName: this.state.name,
      email: this.state.email,
      roomId: this.state.roomId
    })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    message.success('Update Success: '
      + this.state.house + ' '
      + this.state.room + ' '
      + this.state.name + ' '
      + this.state.email
    );
  }

  leave () {
    return '/house';
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
        </div><br/>
        <div>
          <RoomSelector reset={this.state.resetRoomSelector} house={this.state.house} getRoomNumber={this.getRoomNumber.bind(this)}
                        getRoomId={this.getRoomId.bind(this)}/>
        </div><br/>
        <div>
          <Input placeholder="Tenant Name" value={this.state.name}
                 onChange={this.handleTenantChange.bind(this)} style={{ width: 200}}/>
        </div><br/>
        <div>
          <Input placeholder="Tenant Email" value={this.state.email}
                 onChange={this.handleEmailChange.bind(this)} style={{ width: 200}}/>
        </div><br/>
        <div>
          <Button type="primary" onClick={this.submit.bind(this)} style={{ width: 100}}>Update</Button>
          <Button type="ghost" onClick={this.leave.bind(this)} style={{ width: 100}}>
            <Link to={this.leave()}>Leave</Link></Button>
        </div>

      </div>
    );
  }
}
