import React from 'react';
import {Link} from 'react-router';
import {Button, message, Popconfirm, Table} from 'antd';
import axios from 'axios';
import styles from './House.less';
import HouseSelector from './HouseSelector'
import Helper from "./Helper";

export default class Parcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locale: {emptyText: 'No Data'},
      log: 'Archived',
      operation: 'Archive'
    };
  }

  fetchTableData(state) {
    axios.get(Helper.getURL() + '/api/log/' + state, {
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


  }

  archive(roomId) {
    axios.post(Helper.getURL() + '/api/archive/' + roomId, {
      roomId: roomId
    })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    message.success('Archive Success');
    this.fetchTableData('current');
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

  componentDidMount() {
    this.fetchTableData('current');
  }

  render() {

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
          <Popconfirm title="Are you sure you want to delete this room?" okText="Confirm" cancelText="Cancel"
                      onConfirm={this.delete.bind(this, record.roomId)}>
            <a href="#">Delete{record.roomId}</a>
          <Popconfirm title="Are you sure you want to archive this record?" okText="Confirm" cancelText="Cancel"
                      onConfirm={this.archive.bind(this, record.roomId)}>
            <a href="#">{this.state.operation}{record.roomId}</a>
          </Popconfirm>
        </span>
      )
    }];

    return (
      <div>
        <div className={styles.content}>
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
