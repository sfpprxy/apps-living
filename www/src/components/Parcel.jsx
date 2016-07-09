import React from 'react';
import {Link} from 'react-router';
import {Button, message, Modal, Popconfirm, Table} from 'antd';
import axios from 'axios';
import styles from './House.less';
import HouseSelector from './HouseSelector'
import RoomSelector from './RoomSelector'
import Helper from "./Helper";

export default class Parcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locale: {emptyText: 'No Data'},
      log: 'Archived',
      operation: 'Archive',
      roomId: null,
      house: '',
      room: '',
      name: '',
      email: ''
    };
  }

  fetchTableData(state) {
    axios.get(Helper.getURL() + '/api/logs/' + state, {
    })
      .then(jsonData => {
        this.setState({
          loading: false,
          tableData: jsonData.data.logs
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  changeLog() {
    if (this.state.log === 'Archived') {
      this.fetchTableData('archived');
      this.setState({log: 'Current', operation: ''});
    }
    else {
      this.fetchTableData('current');
      this.setState({log: 'Archived', operation: 'Archive'});
    }

  }

  getHouseName (selected) {
    this.setState({house: selected, resetRoomSelector: true});
  }

  getRoomNumber(selected) {
    this.setState({room: selected});
  }

  getRoomId(roomId) {
    this.setState({roomId: roomId, resetRoomSelector: false});
    axios.get(Helper.getURL() + '/api/room/' + roomId, {
    })
      .then(jsonData => {
          this.setState({
            name: jsonData.data.room[0].tenantName,
            email: jsonData.data.room[0].email
          });
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  // TODO: implement newParcel
  newParcel () {
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

  archive(logId) {
    axios.post(Helper.getURL() + '/api/archive', {
      logId: logId
    })
      .then(response => {
        console.log(response);
        message.success('Archive Success');
        this.fetchTableData('current');
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  componentDidMount() {
    this.fetchTableData('current');
  }

  render() {

    console.log('Parcel.state:', this.state);
    console.log('Parcel.props:', this.props);

    const columns = [{
      title: 'Log ID',
      dataIndex: 'logId'
    }, {
      title: 'Arrive Date',
      dataIndex: 'arriveDate'
    }, {
      title: 'Collect Date',
      dataIndex: 'collectDate'
    }, {
      title: 'House Name',
      dataIndex: 'houseName'
    }, {
      title: 'Room Number',
      dataIndex: 'roomNumber'
    }, {
      title: 'Tenant Name',
      dataIndex: 'tenantName'
    }, {
      title: 'Code',
      dataIndex: 'code'
    }, {
      title: 'Operation',
      render: (text, record) => (
        <span>
          <Popconfirm title="Are you sure you want to archive this record?" okText="Confirm" cancelText="Cancel"
                      onConfirm={this.archive.bind(this, record.logId)}>
            <a href="#">{this.state.operation}</a>
          </Popconfirm>
        </span>
      )
    }];

    return (
      <div>
        <div className={styles.content}>
          <HouseSelector getHouseName={this.getHouseName.bind(this)}/>
          <div className={styles.button}>
            <RoomSelector reset={this.state.resetRoomSelector} house={this.state.house}
                          getRoomNumber={this.getRoomNumber.bind(this)} getRoomId={this.getRoomId.bind(this)}/>
          </div>
          <Button className={styles.button} type="ghost" onClick={this.newParcel.bind(this)}>
            New Parcel
          </Button>
          <Button className={styles.button} type="ghost" onClick={this.changeLog.bind(this)}>
            {this.state.log}
          </Button>
        </div>
        <br/>
        <Table columns={columns}
               rowKey={record => record.logId}
               dataSource={this.state.tableData}
               pagination={false}
               loading={this.state.loading}
               locale={this.state.locale}
        />
        <br/><br/><br/>
      </div>
    );
  }
}
