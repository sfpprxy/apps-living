import React from 'react';
import {Table} from 'antd';
import reqwest from 'reqwest';
import axios from 'axios';

// const columns = [{
//   title: '姓',
//   dataIndex: 'name',
//   sorter: true,
//   render: name => `${name.first} ${name.last}`,
//   width: '20%',
// }, {
//   title: '性别',
//   dataIndex: 'gender',
//   filters: [
//     {text: 'Male', value: 'male'},
//     {text: 'Female', value: 'female'},
//   ],
//   width: '20%',
// }, {
//   title: '邮箱',
//   dataIndex: 'email',
// }];

const columns = [{
  title: 'Studnet ID',
  dataIndex: 'studentId',
  key: 'id',
}, {
  title: 'Studnet Name',
  dataIndex: 'studentName',
  key: 'name',
}, {
  title: 'House Name',
  dataIndex: 'houseName',
  key: 'houseName',
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
}, {
  title: 'Room Number',
  dataIndex: 'roomNumber',
  key: 'roomNumber',
}, {
  title: 'Email Address',
  dataIndex: 'email',
  key: 'email',
}, {
  title: 'Operation',
  key: 'operation',
  render: (text, record) => (
    <span>
          <a href="#">Edit {record.name}</a>
        </span>
  ),
}];

export default class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };
  }

  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      student: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  fetch(params = {}) {
    console.log('请求参数：', params);
    this.setState({loading: true});
    // reqwest({
    //   url: 'http://api.randomuser.me',
    //   method: 'get',
    //   data: {
    //     results: 20,
    //     ...params,
    //   },
    //   type: 'json',
    // }).then(data1 => {
    //   const pagination = this.state.pagination;
    //   // Read total count from server
    //   // pagination.total = data.totalCount;
    //   pagination.total = 200;
    //   console.log('aaaaa');
    //   console.log(data1);
    //   this.setState({
    //     loading: false,
    //     tableData: data1.results,
    //     pagination,
    //   });
    // });
    axios.get('http://127.0.0.1:5000/api/student', {
      student: 20,
      ...params,
    })
      .then(jsonData => {
        const pagination = this.state.pagination;
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        console.log('bbbbbb');
        console.log(jsonData);
        this.setState({
          loading: false,
          tableData: jsonData.data.student,
          pagination,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetch();
  }

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
  }
}

