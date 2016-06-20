import React from 'react';
import {Table} from 'antd';
import axios from 'axios';


export default class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };
  }

  // handleTableChange(pagination, filters, sorter) {
  //   console.log('各类参数是', pagination, filters, sorter);
  //   console.log('aaaa');
  //   const pager = this.state.pagination;
  //   console.log('bbbb');
  //   pager.current = pagination.current;
  //   this.setState({
  //     pagination: pager,
  //   });
  //   this.fetch({
  //     student: pagination.pageSize,
  //     page: pagination.current,
  //     sortField: sorter.field,
  //     sortOrder: sorter.order,
  //     ...filters,
  //   });
  // }

  fetch(params = {}) {
    console.log('请求参数：', params);
    this.setState({loading: true});

    axios.get('http://127.0.0.1:5000/api/student', {
      // student: 10,
      ...params,
    })
      .then(jsonData => {
        const pagination = this.state.pagination;
        // Read total count from server
        // pagination.total = data.totalCount;
        // TODO: change hard code
        pagination.total = 245;
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

    const columns = [{
      title: 'Studnet ID',
      dataIndex: 'studentId',
    }, {
      title: 'Studnet Name',
      dataIndex: 'studentName',
    }, {
      title: 'House Name',
      dataIndex: 'houseName',
      // TODO: change hard code below
      // filters: [
      //   { text: '26 WARWICK ROW', value: '26 WARWICK ROW' },
      //   { text: '27 WARWICK ROW', value: '27 WARWICK ROW' },
      //   { text: 'CASSELDEN HOUSE', value: 'CASSELDEN HOUSE' },
      //   { text: 'FORTRESS HOUSE', value: 'FORTRESS HOUSE' },
      //   { text: 'GULSON COURT', value: 'GULSON COURT' },
      //   { text: 'PENNY BLACK HOUSE', value: 'PENNY BLACK HOUSE' },
      //   { text: 'WATERS COURT', value: 'WATERS COURT' },
      // ],
    }, {
      title: 'Room Number',
      dataIndex: 'roomNumber',
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

    console.log('STATE:', this.state);

    return (
      <Table columns={columns}
             rowKey={record => record.studentId}
             dataSource={this.state.tableData}
             pagination={this.state.pagination}
             loading={this.state.loading}
             onChange={this.handleTableChange}
      />
    );
  }
}

