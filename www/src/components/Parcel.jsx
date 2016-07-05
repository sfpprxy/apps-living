import React from 'react';
import {Link} from 'react-router';
import {Button, message, Popconfirm, Table} from 'antd';
import axios from 'axios';
import styles from './House.less';
import HouseSelector from './HouseSelector'
import Helper from "./Helper";

export default class RoomSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locale: {emptyText: 'No Data'}
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

  delete() {

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
          </Popconfirm>
        </span>
      )
    }];

    return (
      <div>
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
