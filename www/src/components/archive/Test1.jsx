import React from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';
import axios from 'axios';

// export default class Test extends React.Component {
const columns = [{
  title: 'Studnet ID',
  dataIndex: 'studentId',
  sorter: true,
}, {
  title: 'Studnet Name',
  dataIndex: 'studentName',
}, {
  title: 'House Name',
  dataIndex: 'houseName',
  // TODO: change hard code below
  filters: [
    { text: '26 WARWICK ROW', value: '26 WARWICK ROW' },
    { text: '27 WARWICK ROW', value: '27 WARWICK ROW' },
    { text: 'CASSELDEN HOUSE', value: 'CASSELDEN HOUSE' },
    { text: 'FORTRESS HOUSE', value: 'FORTRESS HOUSE' },
    { text: 'GULSON COURT', value: 'GULSON COURT' },
    { text: 'PENNY BLACK HOUSE', value: 'PENNY BLACK HOUSE' },
    { text: 'WATERS COURT', value: 'WATERS COURT' },
  ],
  sorter: true,
}, {
  title: 'Room Number',
  dataIndex: 'roomNumber',
  sorter: true,
}, {
  title: 'Email Address',
  dataIndex: 'email',
}, {
  title: 'Operation',
  render: (text, record) => (
    <span>
          <a href="#">Edit</a>
        </span>
  ),
}];


const Test1 = React.createClass({
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
      url: 'http://127.0.0.1:5000/api/student',
      method: 'get',
      data: {
        student: 20,
        ...params,
      },
      type: 'json',
    }).then(data1 => {
      const pagination = this.state.pagination;
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 245;
      console.log('aaaaa');
      console.log(data1);
      this.setState({
        loading: false,
        tableData: data1.student,
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
             rowKey={record => record.studentId}
             dataSource={this.state.tableData}
             pagination={this.state.pagination}
             loading={this.state.loading}
             onChange={this.handleTableChange}
      />
    );
  },
});

export default Test1;

