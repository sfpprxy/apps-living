import React from 'react';
import {Link} from 'react-router';
import {Table, Select, Button} from 'antd';
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

  fetchHouses() {
    axios.get('http://127.0.0.1:5000/api/houses', {
    })
      .then(jsonData => {
        this.setState({
          houses: jsonData.data.houses
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetch(params = {houseName: 'PENNY BLACK HOUSE'}) {
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

  getHouseName(houseName) {
    this.fetch({houseName: houseName});
  }

  componentDidMount() {
    this.fetch();
    this.fetchHouses();
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
          <Link to="/actived">Edit Tenant {record.roomId}</Link>
          <span className="ant-divider" />
          <Link to="/delete">Delete{record.roomId}</Link>
        </span>
      )
    }];

    const Option = Select.Option;
    let h = this.state.houses;
    let children = [];
    for (let i = 0; i < h.length; i++) {
      children.push(<Option key={h[i].houseName}>
        {h[i].houseName}</Option>);
    }

    return (
      <div >
        <div className={styles.content}>
          <HouseSelector getHouseName={this.getHouseName.bind(this)}/>
          <Button className={styles.newRoom} type="ghost"><Link to="/newroom">New Room</Link></Button>
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

