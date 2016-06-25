import React from 'react';
import {Link} from 'react-router';
import {Table, Button} from 'antd';
import axios from 'axios';
import styles from './Accommodation.less';
import HouseSelector from './HouseSelector'

export default class Accommodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      pagination: {},
      loading: true,
      locale: {emptyText: 'No Data'},
      houses: []
    };
  }

  // TODO: enable edit

  fetchTableData(params = {houseName: 'PENNY BLACK HOUSE'}) {
    axios.get('http://127.0.0.1:5000/api/tenants/' + params.houseName, {
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
    this.fetchTableData({houseName: selected});
  }

  handleEdit(roomId) {
    console.log(roomId);
    this.props.getRoomId(roomId);
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
          <Link to="/delete-room">Delete{record.roomId}</Link>
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

