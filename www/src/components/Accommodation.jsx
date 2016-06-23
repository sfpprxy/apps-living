import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import {Table, Select} from 'antd';
import axios from 'axios';


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
        console.log('HOUS', jsonData);
        this.setState({
          houses: jsonData.data.houses
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetch(params = {houseName: 'PENNY BLACK HOUSE'}) {
    console.log('请求参数：', params);
    axios.get('http://127.0.0.1:5000/api/tenants/' + params.houseName, {
    })
      .then(jsonData => {
        const pagination = this.state.pagination;
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = jsonData.data.tenants.length;
        console.log(jsonData);
        this.setState({
          loading: false,
          tableData: jsonData.data.tenants,
          pagination,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(value) {
    console.log(`selected ${value}`);
    console.log('selected', {value});
    this.fetch({houseName: value});
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
      dataIndex: 'houseName',
    }, {
      title: 'Room Number',
      dataIndex: 'roomNumber',
    }, {
      title: 'Tenant Name',
      dataIndex: 'tenantName',
    }, {
      title: 'Email Address',
      dataIndex: 'email',
    }, {
      title: 'Operation',
      render: (text, record) => (
        <span>
          <Link to="/actived">Edit Tenant</Link><br />
        </span>
      ),
    }];

    const Option = Select.Option;
    let h = this.state.houses;
    let children = [];
    for (let i = 0; i < h.length; i++) {
      children.push(<Option key={h[i].houseName}>
        {h[i].houseName}</Option>);
    }

    console.log('THIS.STATE:', this.state);

    return (
      <div>
        <Select showSearch
                style={{ width: 200 }}
                placeholder="Select house"
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
        >
          {children}
        </Select>
        <p>
          {this.value}
        </p>
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

