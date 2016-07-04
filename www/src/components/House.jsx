import React from 'react';
import {Link} from 'react-router';
import {Button, message, Popconfirm, Table} from 'antd';
import axios from 'axios';
import styles from './House.less';
import HouseSelector from './HouseSelector'
import Helper from "./Helper";

export default class House extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
      loading: true,
      locale: {emptyText: 'No Data'},
      houses: []
    };
  }

  fetchTableData(params = {houseName: 'PENNY BLACK HOUSE'}) {
    axios.get(Helper.getURL() + '/api/tenants/' + params.houseName, {
    })
      .then(jsonData => {
        const pagination = this.state.pagination;
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = jsonData.data.tenants.length;
        this.setState({
          loading: false,
          tableData: jsonData.data.tenants,
          pagination
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getHouseName(selected) {
    this.setState({
      houseName: selected
    })
    this.fetchTableData({houseName: selected});
  }

  delete(roomId) {
    axios.post(Helper.getURL() + '/api/delete-room', {
      roomId: roomId
    })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    message.success('Delete Success '
    );
    setTimeout(() => this.fetchTableData({houseName: this.state.houseName}), 1000);
  }

  componentDidMount() {
    this.fetchTableData();
  }

  render() {

    const columns = [{
      // title: 'Room ID',
      // dataIndex: 'roomId',
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
      title: 'Email Address',
      dataIndex: 'email'
    }, {
      title: 'Operation',
      render: (text, record) => (
        <span>
          <Popconfirm title="Are you sure you want to delete this room?" okText="Confirm" cancelText="Cancel"
                      onConfirm={this.delete.bind(this, record.roomId)}>
            <a href="#">Delete{record.email}</a>
          </Popconfirm>
        </span>
      )
    }];

    return (
      <div >
        <div className={styles.content}>
          <HouseSelector getHouseName={this.getHouseName.bind(this)}/>
          <Button className={styles.button} type="ghost"><Link to="/new-room">New Room</Link></Button>
          <Button className={styles.button} type="ghost"><Link to="/edit-room">Edit Room</Link></Button>
        </div>
        <br/>
        <Table columns={columns}
               rowKey={record => record.roomId}
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

