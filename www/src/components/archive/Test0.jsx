import React from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';
import axios from 'axios';

// export default class Test extends React.Component {
const columns = [{
  title: '姓名',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '20%',
}, {
  title: '性别',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: '邮箱',
  dataIndex: 'email',
}];


const Test0 = React.createClass({
  getInitialState() {
    return {
      data: [],
      pagination: {},
      loading: false,
    };
  },
  handleTableChange(pagination, filters, sorter) {
    console.log('各类参数是', pagination, filters, sorter);
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  },
  fetch(params = {}) {
    console.log('请求参数：', params);
    this.setState({ loading: true });
    reqwest({
      url: 'http://api.randomuser.me',
      method: 'get',
      data: {
        results: 20,
        ...params,
      },
      type: 'json',
    }).then(data1 => {
      const pagination = this.state.pagination;
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      console.log('aaaaa');
      console.log(data1);
      this.setState({
        loading: false,
        tableData: data1.results,
        pagination,
      });
    });
  },
  //   axios.get('http://api.randomuser.me', {
  //       results: 20,
  //       ...params,
  //   })
  //     .then(jsonData => {
  //       const pagination = this.state.pagination;
  //       // Read total count from server
  //       // pagination.total = data.totalCount;
  //       pagination.total = 200;
  //       console.log('bbbbbb');
  //       console.log(jsonData);
  //       this.setState({
  //         loading: false,
  //         tableData: jsonData.data.results,
  //         pagination,
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // },
  componentDidMount() {
    this.fetch();
  },
  render() {
    return (
      <Table columns={columns}
             rowKey={record => record.registered}
             dataSource={this.state.tableData}
             pagination={this.state.pagination}
             loading={this.state.loading}
             onChange={this.handleTableChange}
      />
    );
  },
});

export default Test0;

